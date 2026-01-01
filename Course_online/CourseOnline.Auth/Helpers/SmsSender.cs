using Microsoft.VisualBasic;
using Microsoft.VisualStudio.OLE.Interop;
using System.Linq.Expressions;
using Twilio;
using Twilio.Rest.Api.V2010.Account;


namespace CourseOnline.Auth.Helpers
{
    public class SmsSender
    {

        public static void SendSms(string phoneNumber, string message)
        {

            TwilioClient.Init(Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID")!, Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN")!);

            MessageResource.Create(
                body: message,
                from: new Twilio.Types.PhoneNumber(Environment.GetEnvironmentVariable("TWILIO_FROM_NUMBER")!),
                to: new Twilio.Types.PhoneNumber(phoneNumber)
            );

            {


            }
        }
    }
}
