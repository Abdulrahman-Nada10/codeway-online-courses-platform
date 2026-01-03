using OnlineCourse.Payment.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineCourse.Payment.Application.Sevices
{
    public class EnrollmentService
    {
        public Enrollment CreateEnrollment(Guid studentId, Guid courseId, bool isSubscription)
        {
            return new Enrollment
            {
                EnrollmentID = Guid.NewGuid(),
                StudentID = studentId,
                CourseID = courseId,
                EnrollmentDate = DateTime.UtcNow,
                ExpiryDate = isSubscription ? DateTime.UtcNow.AddMonths(1) : null
            };
        }
    }

}
