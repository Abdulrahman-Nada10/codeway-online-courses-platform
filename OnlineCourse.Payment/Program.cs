using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OnlineCourse.Payment.Data;
using OnlineCourse.Payment.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Services - DbContext injected directly, no Repo/UoW needed
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IPaymobService, PaymobService>();
builder.Services.AddScoped<ICourseManagementService, CourseManagementService>();

//builder.Services.AddScoped<IPaymobService, PaymobService>();
//builder.Services.AddScoped<IOrderService, OrderService>();
//builder.Services.AddScoped<ICourseManagementService, CourseManagementService>();

// Named HttpClient for Paymob API calls
// BaseUrl = https://accept.paymob.com
builder.Services.AddHttpClient("Paymob", client =>
{
    client.BaseAddress = new Uri(builder.Configuration["Paymob:BaseUrl"]!);
});

// Named HttpClient for calling CourseManagement microservice
// JWT is forwarded per-request in CourseManagementService - not set globally here
builder.Services.AddHttpClient("CourseManagement", client =>
{
    client.BaseAddress = new Uri(builder.Configuration["Services:CourseManagement"]!);
});

// JWT - validates token locally using shared secret key
// No need to call Auth service - JWT is self-contained
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)),
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"]
        };
    });

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
