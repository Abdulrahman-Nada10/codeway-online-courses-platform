using MailKit.Net.Smtp;
using MimeKit;

namespace CourseOnline.Auth.Helpers
{
    public class EmailSender
    {

        public static void SendEmail(string toEmail, string subject, string body)
        {
            var email = new MimeMessage();
            var appEmail = Environment.GetEnvironmentVariable("EMAIL_SMTP_USER")!;
            email.From.Add(new MailboxAddress("OnlineCourses", appEmail));
            email.To.Add(MailboxAddress.Parse(toEmail));
            email.Subject = subject;
            email.Body = new TextPart("plain") { Text = body };

            using var smtp = new SmtpClient();
            smtp.Connect("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate(Environment.GetEnvironmentVariable("EMAIL_SMTP_USER")!, Environment.GetEnvironmentVariable("EMAIL_SMTP_PASS")!);
            smtp.Send(email);
            smtp.Disconnect(true);
        }
    }
}
