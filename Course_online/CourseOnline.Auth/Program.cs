using CourseOnline.Auth.Data;
using CourseOnline.Auth.Helpers;
using CourseOnline.Auth.Repositories.Implementations;
using CourseOnline.Auth.Repositories.Interfaces;
using CourseOnline.Auth.Repositories.Interfaces___Copy;
using CourseOnline.Auth.Services.Implementation;
using CourseOnline.Auth.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
var builder = WebApplication.CreateBuilder(args);
var googleClientId = builder.Configuration["Google:ClientId"];

var googleClientSecret = builder.Configuration["Google:ClientSecret"];

var fbAppId = builder.Configuration["Facebook:AppId"];
var fbAppSecret = builder.Configuration["Facebook:AppSecret"];

var gitHubClientId = builder.Configuration["GitHub:ClientId"];
var gitHubClientSecret = builder.Configuration["GitHub:ClientSecret"];

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "CourseOnline API", Version = "v1" });

    // إضافة تعريف للأمان
    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Description = "أدخل JWT Bearer token كالتالي: Bearer {token}",
        Name = "Authorization",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IUserRepositoryLogin, UserRepositoryLogin>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
 builder.Services.AddScoped<IUserVerificationRepository,UserVerificationRepository >();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<ISocialAuthService, SocialAuthService>();
builder.Services.AddScoped<ISocialAuthRepository, SocialAuthRepository>();
// Program.cs

builder.Services.AddScoped<IProfileService, ProfileService>();
builder.Services.AddScoped<IProfileRepository, ProfileRepository>();
builder.Services.AddSingleton<FileHelper>(); // لو عايزة Singleton

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme; // <== مهم
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddCookie() // مهم للـ OAuth flow
.AddGoogle(options =>
{
    options.ClientId = googleClientId;
    options.ClientSecret = googleClientSecret;
    options.CallbackPath = "/signin-google";
})
//.AddFacebook(options =>
//{
//    options.AppId = fbAppId;
//    options.AppSecret = fbAppSecret;
//    options.CallbackPath = "/signin-facebook";
//})
.AddGitHub(options =>
{
    options.ClientId = gitHubClientId;
    options.ClientSecret = gitHubClientSecret;
    options.CallbackPath = "/signin-github";
    options.Scope.Add("user:email");
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});
   
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
