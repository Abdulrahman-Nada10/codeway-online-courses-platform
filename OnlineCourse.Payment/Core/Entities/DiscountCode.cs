using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineCourse.Payment.Core.Entities
{
    public class DiscountCode
    {
        public string Code { get; set; }
        public DiscountType Type { get; set; }
        public decimal Value { get; set; }
        public DateTime ExpiryDate { get; set; }
        public int UsageLimit { get; set; }
        public int UsedCount { get; set; }
    }
    
}
