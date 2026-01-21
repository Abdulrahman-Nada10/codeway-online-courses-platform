using System;
using System.Collections.Generic;
using OnlineCourseSystem.Notifications.Infrastructure.Repositories.Interfaces;
using OnlineCourseSystem.Notifications.Models.Data;

namespace OnlineCourseSystem.Notifications.Infrastructure.Repositories.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly NotificationsDbContext _context;
        private readonly Dictionary<Type, object> _genericRepositories = new();

        private IUserNotificationRepository? _userNotifications;
        private INotificationPreferenceRepository? _notificationPreferences;
        private IUserReferenceRepository? _userReferences;
        private IMessageRepository? _messages;
        private IEmailOutboxRepository? _emailOutbox;
        private IPushOutboxRepository? _pushOutbox;
        private IUserDevicesRepository? _userDevices;
        private IScheduledNotificationRepository? _scheduledNotifications;
        private IUserNotificationDeliveries? _userNotificationDeliveries;

        public UnitOfWork(NotificationsDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public IUserNotificationRepository Notifications
        {
            get
            {
                _userNotifications ??= new UserNotificationRepository(_context);
                return _userNotifications;
            }
        }

        public INotificationPreferenceRepository NotificationPreferences
        {
            get
            {
                _notificationPreferences ??= new NotificationPreferenceRepository(_context);
                return _notificationPreferences;
            }
        }

        public IUserReferenceRepository UserReferences
        {
            get
            {
                _userReferences ??= new UserReferenceRepository(_context);
                return _userReferences;
            }
        }

        public IMessageRepository Messages
        {
            get
            {
                _messages ??= new MessageRepository(_context);
                return _messages;
            }
        }

        public IEmailOutboxRepository EmailOutbox
        {
            get
            {
                _emailOutbox ??= new EmailOutboxRepository(_context);
                return _emailOutbox;
            }
        }

        public IPushOutboxRepository PushOutbox
        {
            get
            {
                _pushOutbox ??= new PushOutboxRepository(_context);
                return _pushOutbox;
            }
        }

        public IUserDevicesRepository UserDevices
        {
            get
            {
                _userDevices ??= new UserDevicesRepository(_context);
                return _userDevices;
            }
        }

        public IScheduledNotificationRepository ScheduledNotifications
        {
            get
            {
                _scheduledNotifications ??= new ScheduledNotificationRepository(_context);
                return _scheduledNotifications;
            }
        }

        public IUserNotificationDeliveries UserNotificationDeliveries
        {
            get
            {
                _userNotificationDeliveries ??= new UserNotificationDeliveries(_context);
                return _userNotificationDeliveries;
            }
        }

        public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await _context.SaveChangesAsync(cancellationToken);
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : class
        {
            var type = typeof(TEntity);

            if (_genericRepositories.TryGetValue(type, out var existingRepository))
            {
                return (IGenericRepository<TEntity>)existingRepository;
            }

            var repositoryInstance = new GenericRepository<TEntity>(_context);
            _genericRepositories[type] = repositoryInstance;

            return repositoryInstance;
        }
    }
}