namespace OnlineCourseSystem.Auth
{
    public class RoleService(IUserRepository userRepository) : IRoleService
    {
        private readonly IUserRepository _userRepository = userRepository;

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
