using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineCourse.Payment.Core
{
    public enum PaymentGateway
    {
        Stripe,
        PayPal
    }

    public enum PaymentStatus
    {
        Pending,
        Success,
        Failed
    }

    public enum DiscountType
    {
        Percentage,
        Fixed
    }

}
