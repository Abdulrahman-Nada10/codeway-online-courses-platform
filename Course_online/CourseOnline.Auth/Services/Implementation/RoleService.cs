using CourseOnline.Auth.Models.Entities;
using CourseOnline.Auth.Repositories.Interfaces;
using CourseOnline.Auth.Services.Interfaces;

namespace CourseOnline.Auth.Services.Implementation
{
    public class RoleService:IRoleService
    {
        private readonly IUserRepository _userRepository;

        public RoleService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public List<User> GetAllUsers()
        {
            return _userRepository.GetAllUsers();
        }

        public User GetUserById(long userId)
        {
            return _userRepository.GetUserById(userId);
        }

        public void UpdateRole(long userId, string role)
        {
            _userRepository.UpdateRole(userId, role);
        }
    }
}

