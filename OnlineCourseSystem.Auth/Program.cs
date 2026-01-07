using GlobalResponse.Shared;
using GlobalResponse.Shared.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using OnlineCourseSystem.Auth.Helper;
using OnlineCourseSystem.Auth.Infrastructure;
using OnlineCourseSystem.Auth.Models;
using OnlineCourseSystem.Auth.Services;
using OnlineCourseSystem.Auth.Services.Permission;
using OnlineCourseSystem.Auth.Services.Role;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Configuration
builder.Services.Configure<AuthOptions>(builder.Configuration.GetSection("Auth"));
builder.Services.Configure<PasswordPolicyOptions>(builder.Configuration.GetSection("PasswordPolicyOptions"));

builder.Services.AddSingleton<PasswordValidationHelper>();
builder.Services.AddSingleton<IPepperProvider, PepperProvider>();

builder.Services.AddSingleton<IJwtService, JwtService>();
builder.Services.AddSingleton<IAuthService, AuthService>();
builder.Services.AddSingleton<IPermissionService, PermissionService>();
builder.Services.AddSingleton<IRoleService, RoleService>();


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Auth API", Version = "v1" });
});

builder.Services.AddScoped<LocalizedMessageService>();
builder.Services.Configure<DuplicateProtectionOptions>(builder.Configuration.GetSection("DuplicateProtection"));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Auth:JwtAudience"],
        ValidAudience = builder.Configuration["JAuthwt:JwtIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Auth:JwtKey"]!))
    };
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
