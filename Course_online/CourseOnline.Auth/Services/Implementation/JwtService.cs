using CourseOnline.Auth.Models.Entities;
using CourseOnline.Auth.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CourseOnline.Auth.Services.Implementation
{
    public class JwtService: IJwtService
    {
        private readonly IConfiguration _config;
        public JwtService(IConfiguration configuration)
        {
            _config = configuration;
        }

        public string GenerateToken(User user)
        {
            var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserID.ToString()),
            new Claim("username", user.UserName),
            new Claim("email", user.Email ?? ""),
            new Claim("phone", user.PhoneNumber ?? "")
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(double.Parse(_config["Jwt:DurationInMinutes"])),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
