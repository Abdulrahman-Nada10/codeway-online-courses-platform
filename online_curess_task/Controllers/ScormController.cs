using Microsoft.AspNetCore.Mvc;

using online_curess_task.DTOs.scormandxapi;
using online_curess_task.Modle;
using online_curess_task.Repositories.IRepositories;

using Newtonsoft.Json;

namespace online_curess_task.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScormController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ScormController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [HttpPost("AddScormStatement")]
        public async Task<IActionResult> AddScormStatement([FromBody] ScromStatementDto scromStatementDto)
        {
            if (string.IsNullOrWhiteSpace(scromStatementDto.RawJSON))
                return BadRequest("RawJSON is required");

            var statement = new ScormStatement
            {

                StudentId = scromStatementDto.StudentID,
                CourseId = scromStatementDto.CourseID,
                LessonId = scromStatementDto.LessonID,
                RawJSON = scromStatementDto.RawJSON,
                Verb = scromStatementDto.Verb.ToLower(),

                CreatedAt = DateTime.UtcNow
            };

        await _unitOfWork.ScormStatmentRepository.CreateAsync(statement);
          await  _unitOfWork.ScormStatmentRepository.CommitAsync();

            return Ok(new { message = "Statement saved successfully" });

        }
        [HttpGet("GetLessonProgress/{studentId}/{lessonId}")]
        public async Task<IActionResult> GetLessonProgress(int studentId, int lessonId)
        {
            var statements = (await _unitOfWork.ScormStatmentRepository.GetAsync(e => e.StudentId == studentId &&
            e.LessonId == lessonId))
            .OrderByDescending(e => e.CreatedAt)
            .ToList();

            if (!statements.Any())
                return NotFound();
            var LastStatement = statements.FirstOrDefault();
            if (LastStatement == null || LastStatement.Verb == null)
                return NotFound();

            var started = LastStatement.Verb.Contains("started");
            var completed = LastStatement.Verb.Contains("completed");
            var passed = LastStatement.Verb.Contains("passed");
            var failed = LastStatement.Verb.Contains("failed");
            var score = ExtractScore(statements);

            return Ok(new LessonProgressDto
            {
                StudentID = studentId,
                LessonID = lessonId,
                Completed = completed,
                Started = started,
                Passed = passed,
                Failed = failed,
                Score = score,

                LastActivity = LastStatement.CreatedAt
            });
        }

        private double? ExtractScore(List<ScormStatement> statements)
        {
            foreach (var item in statements.OrderByDescending(s => s.CreatedAt))
            {
                try
                {
                    var xapi = JsonConvert.DeserializeObject<XApiStatement>(item.RawJSON);

                    if (xapi?.result?.score?.scaled != null)
                        return xapi.result.score.scaled;
                }
                catch (JsonException ex)
                {

                    Console.WriteLine($" Error:{ex}");
                }
            }
            return null;
        }
    }
}
