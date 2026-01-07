namespace CourseOnline.Auth.DTOs.Profile
{
    public class UpdateProfileDto
    {
        public string FullName { get; set; }
        public string Bio { get; set; }
        public IFormFile ProfileImage { get; set; }
    }
}
