using MediatR;
using OnlineCourseSystem.Notifications.Infrastructure.Repositories.UnitOfWork;
using OnlineCourseSystem.Notifications.Models;
using System.Text.Json;

namespace OnlineCourseSystem.Notifications.Features.ScheduledNotifications.Commands
{
    public class ScheduleNotificationCommandHandler : IRequestHandler<ScheduleNotificationCommand, Guid>
    {
        private readonly IUnitOfWork _unitOfWork;

        public ScheduleNotificationCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Guid> Handle(ScheduleNotificationCommand request, CancellationToken cancellationToken)
        {
            var scheduledNotification = new ScheduledNotification
            {
                Id = Guid.NewGuid(),
                NotificationType = request.NotificationType.ToString(),
                Title = request.Title,
                Content = request.Content,
                CourseId = request.CourseId,
                UserIdsJson = JsonSerializer.Serialize(request.UserIds),
                ScheduledFor = request.ScheduledFor,
                IsProcessed = false,
                CreatedAt = DateTime.UtcNow
            };

            await _unitOfWork.ScheduledNotifications.AddAsync(scheduledNotification, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return scheduledNotification.Id;
        }
    }
}
