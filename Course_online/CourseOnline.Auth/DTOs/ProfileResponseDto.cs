namespace CourseOnline.Auth.DTOs
{
    public class ProfileResponseDto
    {
        public string UserName { get; set; }
        public string Bio { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
