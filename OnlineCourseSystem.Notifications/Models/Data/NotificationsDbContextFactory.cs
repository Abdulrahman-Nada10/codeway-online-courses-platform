using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using OnlineCourseSystem.Notifications.Models.Data;

public class NotificationsDbContextFactory
    : IDesignTimeDbContextFactory<NotificationsDbContext>
{
    public NotificationsDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder =
            new DbContextOptionsBuilder<NotificationsDbContext>();

        optionsBuilder.UseSqlServer(
            "Server=.;Database=OnlineCourseDB;Integrated Security=True;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=True");

        return new NotificationsDbContext(optionsBuilder.Options);
    }
}
