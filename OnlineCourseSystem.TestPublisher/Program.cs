using MassTransit;
using Microsoft.Extensions.DependencyInjection;
using OnlineCourseSystem.Contracts.Messaging.Events;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;


var host = Host.CreateDefaultBuilder(args)

    .ConfigureAppConfiguration(config =>
    {
        config.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
    })
    .ConfigureServices((context, services) =>
    {
        var rabbitMq = context.Configuration.GetSection("RabbitMq");

        services.AddMassTransit(x =>
        {
            x.UsingRabbitMq((ctx, cfg) =>
            {
                cfg.Host(
                    rabbitMq["Host"] ?? "localhost",
                    rabbitMq["VirtualHost"] ?? "/",
                    h =>
                    {
                        h.Username(rabbitMq["Username"] ?? "guest");
                        h.Password(rabbitMq["Password"] ?? "guest");
                    });
            });
        });
    })
    .Build();

await host.StartAsync();

var publishEndpoint = host.Services.GetRequiredService<IServiceProvider>().GetRequiredService<IPublishEndpoint>();

Console.WriteLine("Publisher started.");
Console.WriteLine("1) Publish NotificationRequestedEvent");
Console.WriteLine("2) Publish PaymentSucceededEvent");
Console.WriteLine("3) Publish UserEnrolledEvent");
Console.WriteLine("0) Exit");

while (true)
{
    Console.Write("\nChoose: ");
    var input = Console.ReadLine();

    if (input == "0")
        break;

    if (input == "1")
    {
        Console.Write("Enter UserId (GUID): ");
        var userIdText = Console.ReadLine();

        if (!Guid.TryParse(userIdText, out var userId))
        {
            Console.WriteLine("❌ Invalid GUID");
            continue;
        }

        var ev = new NotificationRequestedEvent
        {
            UserIds = new List<Guid> { userId },
            NotificationType = "System",
            Title = "RabbitMQ Test Notification",
            Content = "Hello from Publisher Service!",
            CourseId = null,
            CorrelationId = Guid.NewGuid(),
            TraceId = Guid.NewGuid().ToString()
        };

        await publishEndpoint.Publish(ev);
        Console.WriteLine("NotificationRequestedEvent published!");
    }
    else if (input == "2")
    {
        Console.Write("Enter UserId (GUID): ");
        var userIdText = Console.ReadLine();

        if (!Guid.TryParse(userIdText, out var userId))
        {
            Console.WriteLine("Invalid GUID");
            continue;
        }

        var ev = new PaymentSucceededEvent
        {
            UserId = userId,
            Amount = 200,
            Currency = "EGP",
            Description = "Test payment from Publisher Service",
            CourseId = null,
            CorrelationId = Guid.NewGuid(),
            TraceId = Guid.NewGuid().ToString()
        };

        await publishEndpoint.Publish(ev);
        Console.WriteLine("PaymentSucceededEvent published!");
    }
    else if (input == "3")
    {
        Console.Write("Enter UserId (GUID): ");
        var userIdText = Console.ReadLine();

        Console.Write("Enter CourseId (GUID): ");
        var courseIdText = Console.ReadLine();

        if (!Guid.TryParse(userIdText, out var userId) || !Guid.TryParse(courseIdText, out var courseId))
        {
            Console.WriteLine("Invalid GUID(s)");
            continue;
        }

        var ev = new UserEnrolledEvent
        {
            UserId = userId,
            CourseId = courseId,
            CourseName = "Test Course",
            CorrelationId = Guid.NewGuid(),
            TraceId = Guid.NewGuid().ToString()
        };

        await publishEndpoint.Publish(ev);
        Console.WriteLine("UserEnrolledEvent published!");
    }
    else
    {
        Console.WriteLine("Invalid option.");
    }
}

await host.StopAsync();
Console.WriteLine("Publisher stopped.");
