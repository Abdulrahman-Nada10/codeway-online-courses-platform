namespace OnlineCourseSystem.Auth
{
    public interface ILoginRepository
    {
        User GetbyLogin(string Login);
        void UpdateLoginFailure(long UserID);
        void ResetFailedLoginAttempts(long UserID);
    }
}
