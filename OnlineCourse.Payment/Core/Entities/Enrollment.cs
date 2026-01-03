using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineCourse.Payment.Core.Entities
{
    public class Enrollment
    {
        public Guid EnrollmentID { get; set; }
        public Guid StudentID { get; set; }
        public Guid CourseID { get; set; }
        public DateTime EnrollmentDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
    }
}
