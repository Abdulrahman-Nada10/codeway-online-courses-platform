using OnlineCourse.Payment.Core;
using OnlineCourse.Payment.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineCourse.Payment.Infrastracture.Persistence
{
    public class DiscountService
    {
        public decimal ApplyDiscount(decimal amount, DiscountCode code)
        {
            if (code.ExpiryDate < DateTime.UtcNow)
                throw new Exception("Discount code expired");

            return code.Type == DiscountType.Percentage
                ? amount - (amount * code.Value / 100)
                : amount - code.Value;
        }
    }

}
