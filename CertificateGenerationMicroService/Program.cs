using CertificateGenerationMicroService.Application.Interfaces;
using CertificateGenerationMicroService.Application.Services;
using CertificateGenerationMicroService.Application.Servicies;
using CertificateGenerationMicroService.Domain.UnitOfWork;
using CertificateGenerationMicroService.Infrastructure.Data;
using CertificateGenerationMicroService.Infrastructure.UnitOfWork;

using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Unit of Work
builder.Services.AddScoped<IUOW, UnitOfWork>();

// Services
builder.Services.AddScoped<IPdfGenerationService, PdfGenerationService>();
builder.Services.AddScoped<ICertificateService, CertificateService>();

// HTTP Clients for other microservices
builder.Services.AddHttpClient<IStudentServiceClient, StudentServiceClient>(client =>
{
    client.BaseAddress = new Uri(builder.Configuration["MicroServices:StudentService:BaseUrl"]
        ?? "https://localhost:5001");
    client.Timeout = TimeSpan.FromSeconds(30);
});

builder.Services.AddHttpClient<ICourseServiceClient, CourseServiceClient>(client =>
{
    client.BaseAddress = new Uri(builder.Configuration["MicroServices:CourseService:BaseUrl"]
        ?? "https://localhost:5002");
    client.Timeout = TimeSpan.FromSeconds(30);
});

// Controllers
builder.Services.AddControllers();

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Certificate Generation API",
        Version = "v1",
        Description = "API for generating and managing course completion certificates"
    });
});

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Certificate API V1");
        
    });
}

app.UseHttpsRedirection();

// Create wwwroot and certificates folder if they don't exist
var wwwrootPath = Path.Combine(app.Environment.ContentRootPath, "wwwroot");
var certificatesPath = Path.Combine(wwwrootPath, "certificates");

if (!Directory.Exists(certificatesPath))
{
    Directory.CreateDirectory(certificatesPath);
}

app.UseStaticFiles();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

app.Run();
