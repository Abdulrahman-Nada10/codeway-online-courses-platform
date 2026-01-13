namespace OnlineCourseSystem.Auth.Infrastructure
{
    public interface IPepperProvider
    {
        string Pepper { get; }
    }

    public class PepperProvider : IPepperProvider
    {
        public string Pepper { get; }

        public PepperProvider(IConfiguration config)
        {
            Pepper = config.GetSection("Auth")["PasswordPepper"] ?? throw new Exception("PasswordPepper not configured.");
        }
    }

}
