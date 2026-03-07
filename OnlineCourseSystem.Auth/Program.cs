using GlobalResponse.Shared;
using GlobalResponse.Shared.Configuration;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using OnlineCourseSystem.Auth;
using OnlineCourseSystem.Auth.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Social login configuration
var googleClientId = builder.Configuration["Google:ClientId"];
var googleClientSecret = builder.Configuration["Google:ClientSecret"];

var fbAppId = builder.Configuration["Facebook:AppId"];
var fbAppSecret = builder.Configuration["Facebook:AppSecret"];

var gitHubClientId = builder.Configuration["GitHub:ClientId"];
var gitHubClientSecret = builder.Configuration["GitHub:ClientSecret"];

// Configuration
builder.Services.Configure<AuthOptions>(builder.Configuration.GetSection("Auth"));
builder.Services.Configure<PasswordPolicyOptions>(builder.Configuration.GetSection("PasswordPolicyOptions"));



builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "CourseOnline API", Version = "v1" });

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

builder.Services.AddScoped<LocalizedMessageService>();
builder.Services.Configure<DuplicateProtectionOptions>(builder.Configuration.GetSection("DuplicateProtection"));

builder.Services.AddScoped<ILoginRepository, LoginRepository>();
builder.Services.AddScoped<IVerificationRepository, VerificationRepository>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<ISocialService, SocialService>();
builder.Services.AddScoped<ISocialRepository, SocialRepository>();

builder.Services.AddScoped<IProfileService, ProfileService>();
builder.Services.AddScoped<IProfileRepository, ProfileRepository>();
builder.Services.AddSingleton<FileHelper>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
})
.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme) // مهم للـ OAuth flow
.AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
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
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
    };
})
//
.AddGoogle(options =>
{
    options.ClientId = builder.Configuration["Auth:Google:ClientId"]!;
    options.ClientSecret = builder.Configuration["Auth:Google:ClientSecret"]!;
    options.CallbackPath = "/signin-google";
})
.AddGitHub(options =>
{
    options.ClientId = builder.Configuration["Auth:GitHub:ClientId"]!;
    options.ClientSecret = builder.Configuration["Auth:GitHub:ClientSecret"]!;
    options.CallbackPath = "/signin-github";
    options.Scope.Add("user:email");
});

//Cors configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseRequestDuplicateProtection();

app.MapControllers();

app.Run();
