
using CourseMangment.MicroService.Application.DTO_s;
using CourseMangment.MicroService.Application.interfaces;
using CourseMangment.MicroService.Application.Mapping;
using CourseMangment.MicroService.Domain.Entities;
using CourseMangment.MicroService.Domain.Enums;
using CourseMangment.MicroService.Domain.UnitOfWork;
using Microsoft.EntityFrameworkCore;

namespace CourseMangment.MicroService.Application.Servicies
{
    public class CourseService(IUOW unitofwork) : ICourseService
    {

        public async Task<IEnumerable<CourseDto>> GetAllCoursesAsync()
        {
            var Repo = unitofwork.GetRepository<Course, Guid>();
            var Courses = await Repo.GetAllAsync(c=>c.Category);
            // Filter out deleted courses
            var activeCourses = Courses.Where(c => !c.IsDeleted);
            if (!activeCourses.Any())
            {
                return Enumerable.Empty<CourseDto>(); // Better than throwing exception
            }
            var CoursesDto = activeCourses.ToCourseDtoList();
            return CoursesDto;

        }

        public async Task<CourseDto> GetCourseByIdAsync(Guid id)
        {
            var Repo = unitofwork.GetRepository<Course, Guid>();
            var course = await Repo.GetByIdAsync(id,c=>c.Category);
            if (course == null || course.IsDeleted)
            {
                throw new KeyNotFoundException($"Course with ID {id} not found.");
            }
            var courseDto = course.ToCourseDto();
            return courseDto;

        }

        public async Task<CourseDto> CreateAsync(CreateCourseDto createCourseDto)
        {
            var Repo = unitofwork.GetRepository<Course, Guid>();
            //  Convert DTO to Entity using extension method
            var course = createCourseDto.ToEntity();
            if(course is null)
            {
                throw new Exception("Mapping resulted in null Course entity.");
            }
            await Repo.CreateAsync(course);
            await unitofwork.SaveChangesAsync();
            var createdCourse = await Repo.GetByIdAsync(course.Id, c => c.Category);
            var courseDto = course.ToCourseDto();
            return createdCourse!.ToCourseDto();
            
        }

        public async Task<CourseDto?> UpdateAsync(Guid id, UpdateCourseDto dto)
        {
            var Repo = unitofwork.GetRepository<Course, Guid>();
            var course = await Repo.GetByIdAsync(id);
            if(course is null || course.IsDeleted)
            {
                throw new Exception("Course not found.");
            }

            // Validate new category exists (if category is being changed)
            if (course.CategoryId != dto.CategoryId)
            {
                var categoryRepo = unitofwork.GetRepository<Category, int>();
                var categoryExists = await categoryRepo.GetByIdAsync(dto.CategoryId);
                if (categoryExists == null)
                {
                    throw new ArgumentException($"Category with ID {dto.CategoryId} not found.");
                }
            }
            // ⭐ Update entity properties from DTO using extension method
            course.UpdateFromDto(dto);

            // Update in repository
            Repo.update(course);

            // Save changes
            await unitofwork.SaveChangesAsync();

            var updatedCourse = await Repo.GetByIdAsync(id, c => c.Category);

            // Reload with category for complete response
            //var updatedCourse = await Repo.GetByIdAsync(course.Id);

            // ⭐ Convert to response DTO
            return updatedCourse!.ToCourseDto();

        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            // Get the course
            var repo = unitofwork.GetRepository<Course, Guid>();
            var course = await repo.GetByIdAsync(id);

            // Check if course exists and is not already deleted
            if (course == null || course.IsDeleted)
            {
                return false; // Course not found or already deleted
            }

            // ⭐ Soft delete - Mark as deleted instead of removing from database
            course.IsDeleted = true;
            course.UpdatedAt = DateTime.UtcNow;

            // Update in repository
            repo.update(course);

            // Save changes
            await unitofwork.SaveChangesAsync();

            return true; // Successfully deleted
        }

       

       

        public async Task<IEnumerable<CourseDto>> GetDraftCoursesAsync()
        {
            var repo = unitofwork.GetRepository<Course, Guid>();
            var courses = await repo.GetAllAsync(c=>c.Category);

            // Filter draft courses that are not deleted
            return courses
                .Where(c => c.Status == CourseStatus.Draft && !c.IsDeleted)
                .ToCourseDtoList();
        }

        public async Task<IEnumerable<CourseDto>> GetPublishedCoursesAsync()
        {
            var repo = unitofwork.GetRepository<Course, Guid>();
            var courses = await repo.GetAllAsync(c=>c.Category);

            // Filter draft courses that are not deleted
            return courses
                .Where(c => c.Status == CourseStatus.Published && !c.IsDeleted)
                .ToCourseDtoList();
        }



        public async Task<bool> PublishCourseAsync(Guid id)
        {
            var repo = unitofwork.GetRepository<Course, Guid>();
            var course = await repo.GetByIdAsync(id);

            // Check if course exists and is not deleted
            if (course == null || course.IsDeleted)
                return false;

            // Check if already published
            if (course.Status == CourseStatus.Published)
                return false;

            // Optional: Validate course is ready to publish
            if (string.IsNullOrWhiteSpace(course.Title) ||
                string.IsNullOrWhiteSpace(course.Description) ||
                course.Duration <= 0 ||
                course.Price == null || course.Price < 0)
            {
                throw new InvalidOperationException("Course is not ready for publishing. Please complete all required fields.");
            }

            // Change status to Published
            course.Status = CourseStatus.Published;
            course.UpdatedAt = DateTime.UtcNow;

            repo.update(course);
            await unitofwork.SaveChangesAsync();

            return true;
        }

        public async Task<bool> UnpublishCourseAsync(Guid id)
        {
            var repo = unitofwork.GetRepository<Course, Guid>();
            var course = await repo.GetByIdAsync(id);

            // Check if course exists and is not deleted
            if (course == null || course.IsDeleted)
                return false;

            // Check if already draft
            if (course.Status == CourseStatus.Draft)
                return false;

            // Change status back to Draft
            course.Status = CourseStatus.Draft;
            course.UpdatedAt = DateTime.UtcNow;

            repo.update(course);
            await unitofwork.SaveChangesAsync();

            return true;
        }


        public async Task<IEnumerable<CourseDto>> GetCoursesByCategoryAsync(int categoryId)
        {
            // Validate category exists
            var categoryRepo = unitofwork.GetRepository<Category, int>();
            var category = await categoryRepo.GetByIdAsync(categoryId);

            if (category == null)
            {
                throw new ArgumentException($"Category with ID {categoryId} not found.");
            }

            var repo = unitofwork.GetRepository<Course, Guid>();
            var courses = await repo.GetAllAsync(c=>c.Category);

            // Filter by category and exclude deleted
            return courses
                .Where(c => c.CategoryId == categoryId && !c.IsDeleted)
                .ToCourseDtoList();
        }



        public async Task<IEnumerable<CourseDto>> SearchCoursesAsync(string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
            {
                return await GetAllCoursesAsync();
            }

            var repo = unitofwork.GetRepository<Course, Guid>();
            var courses = await repo.GetAllAsync(c=>c.Category);

            // Search in title and description
            return courses
                .Where(c => !c.IsDeleted &&
                           (c.Title.Contains(searchTerm, StringComparison.OrdinalIgnoreCase) ||
                            (c.Description != null && c.Description.Contains(searchTerm, StringComparison.OrdinalIgnoreCase))))
                .ToCourseDtoList();
        }


        public async Task<IEnumerable<CourseDto>> GetCoursesByLevelAsync(CourseLevel level)
        {
            var repo = unitofwork.GetRepository<Course, Guid>();
            var courses = await repo.GetAllAsync(c=>c.Category);

            return courses
                .Where(c => c.Level == level && !c.IsDeleted)
                .ToCourseDtoList();
        }


        public async Task<IEnumerable<CourseDto>> GetCoursesByPriceRangeAsync(decimal? minPrice, decimal? maxPrice)
        {
            var repo = unitofwork.GetRepository<Course, Guid>();
            var courses = await repo.GetAllAsync(c=>c.Category);

            var filteredCourses = courses.Where(c => !c.IsDeleted);

            if (minPrice.HasValue)
            {
                filteredCourses = filteredCourses.Where(c => c.Price >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                filteredCourses = filteredCourses.Where(c => c.Price <= maxPrice.Value);
            }

            return filteredCourses.ToCourseDtoList();
        }

        /////
        /// new git 
        public async Task<PagedResultDto<CourseDto>> GetCoursesWithFilterAsync(CourseQueryParameters query)
        {
            var repo = unitofwork.GetRepository<Course, Guid>();

            // هنا بنشتغل بنفس النمط: Repo + UnitOfWork
            var coursesQuery = repo.GetQueryable(c => c.Category)
                                   .Where(c => !c.IsDeleted);

            if (!string.IsNullOrWhiteSpace(query.Search))
            {
                var search = query.Search.Trim();
                coursesQuery = coursesQuery.Where(c =>
                    c.Title.Contains(search) ||
                    (c.Description != null && c.Description.Contains(search)));
            }

            if (query.CategoryId.HasValue)
                coursesQuery = coursesQuery.Where(c => c.CategoryId == query.CategoryId.Value);

            if (query.Level.HasValue)
                coursesQuery = coursesQuery.Where(c => c.Level == query.Level.Value);

            if (query.MinPrice.HasValue)
                coursesQuery = coursesQuery.Where(c => c.Price >= query.MinPrice.Value);

            if (query.MaxPrice.HasValue)
                coursesQuery = coursesQuery.Where(c => c.Price <= query.MaxPrice.Value);

            var totalCount = await coursesQuery.CountAsync();

            var pageNumber = query.PageNumber <= 0 ? 1 : query.PageNumber;
            var pageSize = query.PageSize <= 0 ? 10 : query.PageSize;

            // Sorting
            switch (query.SortBy?.ToLower())
            {
                case "newest":
                    coursesQuery = query.SortDescending
                        ? coursesQuery.OrderByDescending(c => c.CreatedAt)
                        : coursesQuery.OrderBy(c => c.CreatedAt);
                    break;

                case "rating":
                    coursesQuery = query.SortDescending
                        ? coursesQuery.OrderByDescending(c => c.Rating)
                        : coursesQuery.OrderBy(c => c.Rating);
                    break;

                case "enrollments":
                    coursesQuery = query.SortDescending
                        ? coursesQuery.OrderByDescending(c => c.EnrollmentsCount)
                        : coursesQuery.OrderBy(c => c.EnrollmentsCount);
                    break;

                default:
                    coursesQuery = query.SortDescending
                        ? coursesQuery.OrderByDescending(c => c.Title)
                        : coursesQuery.OrderBy(c => c.Title);
                    break;
            }

            // Pagination + projection زي ما هي
            var items = await coursesQuery
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(c => new CourseDto
                {
                    Id = c.Id,
                    Title = c.Title,
                    Description = c.Description,
                    Price = c.Price,
                    Duration = c.Duration,
                    Level = c.Level,
                    Status = c.Status,
                    CategoryId = c.CategoryId,
                    CategoryName = c.Category.Name,
                    CreatedAt = c.CreatedAt,
                    UpdatedAt = c.UpdatedAt,
                    Rating = c.Rating,                 // 
                    EnrollmentsCount = c.EnrollmentsCount // 
                })
                .ToListAsync();


            return new PagedResultDto<CourseDto>
            {
                Items = items,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalCount = totalCount
            };
        }



    }
}
