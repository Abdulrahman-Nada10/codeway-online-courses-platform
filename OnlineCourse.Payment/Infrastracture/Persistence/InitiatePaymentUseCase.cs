using OnlineCourse.Payment.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineCourse.Payment.Infrastracture.Persistence
{
    public class InitiatePaymentUseCase
    {
        private readonly IPaymentGateway _gateway;

        public InitiatePaymentUseCase(IPaymentGateway gateway)
        {
            _gateway = gateway;
        }

        public async Task<string> Execute(decimal amount, string currency)
        {
            return await _gateway.InitiatePaymentAsync(amount, currency);
        }
    }

}
}
