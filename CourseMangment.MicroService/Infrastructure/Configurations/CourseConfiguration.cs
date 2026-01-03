using CourseMangment.MicroService.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourseMangment.MicroService.Infrastructure.Configurations
{
    public class CourseConfiguration: IEntityTypeConfiguration<Course>
    {
          
        public void Configure(EntityTypeBuilder<Course> builder)
        {
            builder.HasIndex(c => c.Title);
            builder.HasIndex(c => c.CategoryId);
        }
    }
}

