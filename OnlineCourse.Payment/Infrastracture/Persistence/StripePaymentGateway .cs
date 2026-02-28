using OnlineCourse.Payment.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineCourse.Payment.Infrastracture.Persistence
{
    public class StripePaymentGateway : IPaymentGateway
    {
        public async Task<string> InitiatePaymentAsync(decimal amount, string currency)
        {
         
            return "";
        }
    }

    public class PayPalPaymentGateway : IPaymentGateway
    {
        public async Task<string> InitiatePaymentAsync(decimal amount, string currency)
        {
            
            return "";
        }
    }

}
