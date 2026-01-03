using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineCourse.Payment.Application.Interfaces
{
    public interface IPaymentGateway
    {
        Task<string> InitiatePaymentAsync(decimal amount, string currency);
    }
}
