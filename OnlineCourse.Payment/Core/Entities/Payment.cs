using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineCourse.Payment.Core.Entities
{
    public class Payment
    {
       
            public Guid PaymentID { get; set; }
            public Guid StudentID { get; set; }
            public Guid CourseID { get; set; }
            public decimal Amount { get; set; }
            public string Currency { get; set; }
            public PaymentGateway PaymentGateway { get; set; }
            public PaymentStatus Status { get; set; }
            public string TransactionID { get; set; }
            public DateTime CreatedAt { get; set; }
        

    }
}
