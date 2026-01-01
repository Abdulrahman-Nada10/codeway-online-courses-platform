using CourseOnline.Auth.Models.Entities;

namespace CourseOnline.Auth.Repositories.Interfaces
{
    public interface IUserRepositoryLogin
    {

        User GetbyLogin(string Login );
        void UpdateLoginFailure(long UserID);
            void ResetFailedLoginAttempts (long UserID);
       
    }
}
