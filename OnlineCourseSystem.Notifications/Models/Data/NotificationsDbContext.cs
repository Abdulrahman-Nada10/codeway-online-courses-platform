using Microsoft.EntityFrameworkCore;

namespace OnlineCourseSystem.Notifications.Models.Data
{
    public class NotificationsDbContext : DbContext
    {
        public NotificationsDbContext(DbContextOptions<NotificationsDbContext> options)
        : base(options)
        {
        }

        public DbSet<Notification> Notifications { get; set; }
        public DbSet<UserNotification> UserNotifications { get; set; }
        public DbSet<NotificationPreference> NotificationPreferences { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<UserReference> UserReferences { get; set; }
        public DbSet<EmailOutbox> EmailOutbox { get; set; }
        public DbSet<PushOutbox> PushOutbox { get; set; }
        public DbSet<UserDevice> UserDevices { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            ConfigureNotification(modelBuilder);
            ConfigureUserNotification(modelBuilder);
            ConfigureNotificationPreference(modelBuilder);
            ConfigureMessage(modelBuilder);
            ConfigureUserReference(modelBuilder);
            ConfigureEmailOutbox(modelBuilder);
            ConfigurePushOutbox(modelBuilder);
            ConfigureUserDevices(modelBuilder);
        }

        private void ConfigureUserDevices(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserDevice>(entity =>
            {
                entity.ToTable("UserDevices");

                entity.HasKey(x => x.Id);

                entity.Property(x => x.DeviceToken)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(x => x.Platform)
                    .IsRequired();

                entity.Property(x => x.IsActive)
                    .HasDefaultValue(true);

                entity.Property(x => x.CreatedAt)
                    .HasDefaultValueSql("GETUTCDATE()");

                entity.HasIndex(x => x.UserId);
            });

        }

        private void ConfigurePushOutbox(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PushOutbox>(entity =>
            {
                entity.ToTable("PushOutbox");

                entity.HasKey(x => x.Id);

                entity.Property(x => x.Title)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(x => x.Body)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(x => x.Status)
                    .IsRequired();

                entity.Property(x => x.RetryCount)
                    .HasDefaultValue(0);

                entity.Property(x => x.MaxRetries)
                    .HasDefaultValue(3);

                entity.Property(x => x.CreatedAt)
                    .HasDefaultValueSql("GETUTCDATE()");

                entity.Property(x => x.LastError)
                    .HasMaxLength(1000);

                entity.HasIndex(x => new { x.Status, x.CreatedAt });
            });

        }

        private void ConfigureEmailOutbox(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmailOutbox>(entity =>
            {
                entity.ToTable("EmailOutbox");

                entity.HasKey(x => x.Id);

                entity.Property(x => x.ToEmail)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.Property(x => x.Subject)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(x => x.Body)
                    .IsRequired();

                entity.Property(x => x.Status)
                    .IsRequired();

                entity.Property(x => x.RetryCount)
                    .HasDefaultValue(0);

                entity.Property(x => x.MaxRetries)
                    .HasDefaultValue(3);

                entity.Property(x => x.CreatedAt)
                    .HasDefaultValueSql("GETUTCDATE()");

                entity.Property(x => x.LastError)
                    .HasMaxLength(1000);

                entity.HasIndex(x => new { x.Status, x.CreatedAt });
            });
        }

        private void ConfigureUserReference(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserReference>(entity =>
            {
                // Table Name
                entity.ToTable("UserReferences");

                // Primary Key
                entity.HasKey(x => x.UserId);

                // Properties
                entity.Property(x => x.UserId)
                    .IsRequired();

                entity.Property(x => x.CreatedAt)
                    .IsRequired();
            });
        }

        private static void ConfigureNotification(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Notification>(entity =>
            {
                // Primary Key
                entity.HasKey(n => n.Id);

                // Properties
                entity.Property(n => n.Title)
                      .IsRequired()
                      .HasMaxLength(200);

                entity.Property(n => n.Content)
                      .IsRequired()
                      .HasMaxLength(1000);

                entity.Property(n => n.Type)
                      .IsRequired()
                      .HasConversion<string>(); // Store enum as string

                entity.Property(n => n.CreatedAt)
                      .IsRequired();

                entity.HasIndex(n => n.Type); // Index on Type for faster querying by notification type
                entity.HasIndex(n => n.CreatedAt); // Index on CreatedAt for querying recent notifications

                entity.HasMany(n => n.UserNotifications)
                      .WithOne(un => un.Notification)
                      .HasForeignKey(un => un.NotificationId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }


        private static void ConfigureUserNotification(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserNotification>(entity =>
            {
                entity.HasKey(x => x.Id);

                entity.HasOne(x => x.Notification)
                      .WithMany(n => n.UserNotifications)
                      .HasForeignKey(x => x.NotificationId)
                      .OnDelete(DeleteBehavior.Cascade); // When a Notification is deleted, its UserNotifications are also deleted

                entity.HasIndex(x => new { x.UserId, x.NotificationId })  // Index on UserId and NotificationId
                      .IsUnique(); // Ensure a user cannot have duplicate entries for the same notification
                entity.HasIndex(x => new { x.UserId, x.IsRead }); // Index for querying unread/read notifications per user

            });
        }

        private static void ConfigureNotificationPreference(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<NotificationPreference>(entity =>
            {
                entity.HasKey(x => x.Id);

                entity.Property(n => n.NotificationType)
                .IsRequired()
                .HasConversion<string>(); // Store enum as string

                entity.HasIndex(x => new { x.UserId, x.NotificationType }) // Index on UserId and NotificationType
                      .IsUnique(); // Ensure a user has only one preference per notification type
            });
        }

        private static void ConfigureMessage(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Message>(entity =>
            {
                entity.HasKey(x => x.Id);

                entity.Property(x => x.Content)
                      .IsRequired()
                      .HasMaxLength(2000);

                entity.HasIndex(x => new { x.SenderId, x.ReceiverId }); // Index for faster lookups of messages between users
                entity.HasIndex(x => x.SentAt); // Index on SentAt for querying recent messages
            });
        }
    }
}