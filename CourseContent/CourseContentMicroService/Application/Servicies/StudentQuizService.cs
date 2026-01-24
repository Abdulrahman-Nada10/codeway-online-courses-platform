using AutoMapper;
using CourseContentMicroService.Application.DTO_s.AnswersDTO_s;
using CourseContentMicroService.Application.DTO_s.SubmissionDTO_s;
using CourseContentMicroService.Application.Interfaces;
using CourseContentMicroService.Domain.Entities;
using CourseContentMicroService.Domain.Entities.Enums;
using CourseContentMicroService.Domain.Repository;
using CourseContentMicroService.Domain.UnitOfWork;

namespace CourseContentMicroService.Application.Servicies
{
    public class StudentQuizService(IUOW _unitOfWork, IMapper _mapper, IStudentQuizService repo

        , IStudentQuizSubmissionRepository subRepo, IStudentQuizAnswerRepository ansRepo,

        IQuizQuestionRepository qqRepo, IQuizQuestionOptionRepository opRepo) : IStudentQuizService
    {


        public async Task<QuizSubmissionDto> StartQuizAsync(StartQuizDto dto)
        {
            // Check if student already has an active submission
            var existingSubmission = await subRepo
                .GetSubmissionByQuizAndStudentAsync(dto.QuizId, dto.StudentId);

            if (existingSubmission != null && !existingSubmission.Completed)
                return _mapper.Map<QuizSubmissionDto>(existingSubmission);

            // Create new submission
            var submission = new StudentQuizSubmission
            {
                QuizId = dto.QuizId,
                StudentId = dto.StudentId,
                TotalScore = 0,
                Completed = false,
                CreatedAt = DateTime.UtcNow
            };

            await subRepo.CreateAsync(submission);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<QuizSubmissionDto>(submission);
        }

        public async Task<QuizSubmissionDto?> GetActiveSubmissionAsync(int quizId, Guid studentId)
        {
            var submission = await subRepo
               .GetSubmissionByQuizAndStudentAsync(quizId, studentId);

            return submission == null || submission.Completed ? null : _mapper.Map<QuizSubmissionDto>(submission);
        }

        public async Task<IEnumerable<QuizSubmissionDto>> GetSubmissionsByStudentAsync(Guid studentId)
        {
            var submission = await subRepo.GetSubmissionsByStudentIdAsync(studentId);
            return _mapper.Map<IEnumerable<QuizSubmissionDto>>(submission);
        }
        public async Task<IEnumerable<QuizSubmissionDto>> GetIncompleteSubmissionsAsync(Guid studentId)
        {
            //var submission = await subRepo.GetSubmissionsByStudentIdAsync(studentId);
            //var InComplete = (submission == null ? null : submission.Where(s => s.Completed == false));
            var incomplete = await subRepo.GetIncompleteSubmissionsByStudentAsync(studentId);
            return _mapper.Map<IEnumerable<QuizSubmissionDto>>(incomplete);
        }

        public async Task<QuizAnswerDto> SubmitAnswerAsync(SubmitAnswerDto dto)
        {
            // Check if submission exists and is not completed
            var submission = await subRepo.GetByIdAsync(dto.SubmissionId);
            if (submission == null || submission.Completed)
                throw new InvalidOperationException("Cannot submit answer to completed or non-existent submission"); //3shan b3d ma yslm my3dlsh egabto 

            // Check if answer already exists
            var existingAnswer = await ansRepo
                .GetAnswerBySubmissionAndQuestionAsync(dto.SubmissionId, dto.QuestionId);

            if (existingAnswer != null)
                throw new InvalidOperationException("Answer already submitted for this question"); //lw a5tar nfs el e5tiar 

            // Get question details
            var question = await qqRepo.GetQuestionWithOptionsAsync(dto.QuestionId);
            if (question == null)
                throw new ArgumentException("Question not found");

            // Create answer
            var answer = new StudentQuizAnswers
            {
                SubmissionId = dto.SubmissionId,
                QuestionId = dto.QuestionId,
                SelectedOptionId = dto.SelectedOptionId,
                AnswerText = dto.AnswerText,
                Score = 0
            };

            await ansRepo.CreateAsync(answer);
            await _unitOfWork.SaveChangesAsync();

            // Auto-grade if MCQ or TrueFalse
            if (question.QuestionType == QuestionType.MCQ || question.QuestionType == QuestionType.TrueFalse)
            {
                await AutoGradeMCQAsync(answer.Id);
            }

            // Reload answer with details
            var savedAnswer = await ansRepo.GetAnswersWithQuestionAndOptionAsync(dto.SubmissionId);
            var answerDto = savedAnswer.FirstOrDefault(a => a.Id == answer.Id);

            return _mapper.Map<QuizAnswerDto>(answerDto);
        }


        public async Task<QuizSubmissionDetailDto?> CompleteQuizAsync(int submissionId)
        {
            var submission = await subRepo.GetSubmissionWithAnswersAsync(submissionId);
            if (submission == null || submission.Completed)
                return null;

            // Calculate total score
            var totalScore = await AutoGradeSubmissionAsync(submissionId);

            // Mark as completed
            submission.Completed = true;
            submission.SubmittedAt = DateTime.UtcNow;
            submission.TotalScore = totalScore;

            subRepo.update(submission);
            await _unitOfWork.SaveChangesAsync();

            return await GetSubmissionDetailsAsync(submissionId);
        }

        public async Task<QuizSubmissionDetailDto?> GetSubmissionDetailsAsync(int submissionId)
        {
            var submission = await subRepo.GetSubmissionWithAnswersAndDetailsAsync(submissionId);
            if (submission == null)
                return null;

            var dto = _mapper.Map<QuizSubmissionDetailDto>(submission);

            // Map answers with correct answer info if completed
            var answerDtos = new List<QuizAnswerDto>();
            foreach (var answer in submission.Answers)
            {
                var answerDto = _mapper.Map<QuizAnswerDto>(answer);

                // Show correct answer only if quiz is completed
                if (submission.Completed && answer.Question.QuestionType != QuestionType.Essay)
                {
                    var correctOption = await opRepo.GetCorrectOptionAsync(answer.QuestionId);
                    if (correctOption != null)
                    {
                        answerDto.CorrectOptionId = correctOption.Id;
                        answerDto.CorrectOptionText = correctOption.OptionText;
                    }
                }

                answerDtos.Add(answerDto);
            }

            dto.Answers = answerDtos;
            return dto;
        }

        public async Task<decimal> AutoGradeMCQAsync(int answerId)
        {
            var answer = await ansRepo.GetByIdAsync(answerId);
            if (answer == null || !answer.SelectedOptionId.HasValue)
                return 0;

            var question = await qqRepo.GetByIdAsync(answer.QuestionId);
            if (question == null)
                return 0;

            // Get selected option
            var selectedOption = await opRepo.GetByIdAsync(answer.SelectedOptionId.Value);
            if (selectedOption == null)
                return 0;

            // Award marks if correct
            decimal score = selectedOption.IsCorrect ? question.Marks : 0;

            answer.Score = score;
            ansRepo.update(answer);
            await _unitOfWork.SaveChangesAsync();

            return score;
        }

        public async Task<decimal> AutoGradeSubmissionAsync(int submissionId)
        {
            var answers = await ansRepo.GetAnswersBySubmissionIdAsync(submissionId);

            decimal totalScore = 0;
            foreach (var answer in answers)
            {
                // Only grade MCQ/TrueFalse questions
                var question = await qqRepo.GetByIdAsync(answer.QuestionId);
                if (question != null && (question.QuestionType == QuestionType.MCQ || question.QuestionType == QuestionType.TrueFalse))
                {
                    if (answer.Score == 0 && answer.SelectedOptionId.HasValue)
                    {
                        await AutoGradeMCQAsync(answer.Id);
                        var updatedAnswer = await ansRepo.GetByIdAsync(answer.Id);
                        totalScore += updatedAnswer?.Score ?? 0;
                    }
                    else
                    {
                        totalScore += answer.Score;
                    }
                }
                else
                {
                    // Essay questions - use existing score (manual grading)
                    totalScore += answer.Score;
                }
            }

            return totalScore;
        }



        public async Task<bool> ManualGradeAnswerAsync(GradeAnswerDto dto)
        {
            var answer = await ansRepo.GetByIdAsync(dto.AnswerId);
            if (answer == null)
                return false;

            // Validate score doesn't exceed question marks
            var question = await qqRepo.GetByIdAsync(answer.QuestionId);
            if (question == null || dto.Score > question.Marks || dto.Score < 0)
                return false;

            answer.Score = dto.Score;
            ansRepo.update(answer);
            await _unitOfWork.SaveChangesAsync();

            // Recalculate submission total score
            var submission = await subRepo.GetByIdAsync(answer.SubmissionId);
            if (submission != null && submission.Completed)
            {
                var totalScore = await AutoGradeSubmissionAsync(answer.SubmissionId);
                submission.TotalScore = totalScore;
                subRepo.update(submission);
                await _unitOfWork.SaveChangesAsync();
            }

            return true;
        }




        public async Task<bool> UpdateAnswerAsync(int answerId, SubmitAnswerDto dto)
        {
            var answer = await ansRepo.GetByIdAsync(answerId);
            if (answer == null)
                return false;

            // Check if submission is still active
            var submission = await subRepo.GetByIdAsync(answer.SubmissionId);
            if (submission == null || submission.Completed)
                return false;

            answer.SelectedOptionId = dto.SelectedOptionId;
            answer.AnswerText = dto.AnswerText;

            ansRepo.update(answer);
            await _unitOfWork.SaveChangesAsync();

            // Re-grade if MCQ
            var question = await qqRepo.GetByIdAsync(answer.QuestionId);
            if (question != null && (question.QuestionType == QuestionType.MCQ || question.QuestionType == QuestionType.TrueFalse))
            {
                await AutoGradeMCQAsync(answerId);
            }

            return true;
        }
    }
}
