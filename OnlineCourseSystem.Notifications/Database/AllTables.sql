IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251223205341_InitialNotificationsSchema'
)
BEGIN
    CREATE TABLE [Messages] (
        [Id] uniqueidentifier NOT NULL,
        [SenderId] uniqueidentifier NOT NULL,
        [ReceiverId] uniqueidentifier NOT NULL,
        [CourseId] uniqueidentifier NULL,
        [Content] nvarchar(2000) NOT NULL,
        [IsRead] bit NOT NULL,
        [SentAt] datetime2 NOT NULL,
        CONSTRAINT [PK_Messages] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251223205341_InitialNotificationsSchema'
)
BEGIN
    CREATE TABLE [NotificationPreferences] (
        [Id] uniqueidentifier NOT NULL,
        [UserId] uniqueidentifier NOT NULL,
        [NotificationType] nvarchar(50) NOT NULL,
        [InApp] bit NOT NULL,
        [Email] bit NOT NULL,
        [Push] bit NOT NULL,
        CONSTRAINT [PK_NotificationPreferences] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251223205341_InitialNotificationsSchema'
)
BEGIN
    CREATE TABLE [Notifications] (
        [Id] uniqueidentifier NOT NULL,
        [Type] nvarchar(50) NOT NULL,
        [Title] nvarchar(200) NOT NULL,
        [Content] nvarchar(1000) NOT NULL,
        [CourseId] uniqueidentifier NULL,
        [CreatedAt] datetime2 NOT NULL,
        [ExpiryAt] datetime2 NULL,
        CONSTRAINT [PK_Notifications] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251223205341_InitialNotificationsSchema'
)
BEGIN
    CREATE TABLE [UserNotifications] (
        [Id] uniqueidentifier NOT NULL,
        [NotificationId] uniqueidentifier NOT NULL,
        [UserId] uniqueidentifier NOT NULL,
        [IsRead] bit NOT NULL,
        [ReadAt] datetime2 NULL,
        [DeliveredAt] datetime2 NULL,
        CONSTRAINT [PK_UserNotifications] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_UserNotifications_Notifications_NotificationId] FOREIGN KEY ([NotificationId]) REFERENCES [Notifications] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251223205341_InitialNotificationsSchema'
)
BEGIN
    CREATE INDEX [IX_Messages_SenderId_ReceiverId] ON [Messages] ([SenderId], [ReceiverId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251223205341_InitialNotificationsSchema'
)
BEGIN
    CREATE INDEX [IX_Messages_SentAt] ON [Messages] ([SentAt]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251223205341_InitialNotificationsSchema'
)
BEGIN
    CREATE UNIQUE INDEX [IX_NotificationPreferences_UserId_NotificationType] ON [NotificationPreferences] ([UserId], [NotificationType]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251223205341_InitialNotificationsSchema'
)
BEGIN
    CREATE INDEX [IX_Notifications_CreatedAt] ON [Notifications] ([CreatedAt]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251223205341_InitialNotificationsSchema'
)
BEGIN
    CREATE INDEX [IX_Notifications_Type] ON [Notifications] ([Type]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251223205341_InitialNotificationsSchema'
)
BEGIN
    CREATE INDEX [IX_UserNotifications_NotificationId] ON [UserNotifications] ([NotificationId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251223205341_InitialNotificationsSchema'
)
BEGIN
    CREATE INDEX [IX_UserNotifications_UserId_IsRead] ON [UserNotifications] ([UserId], [IsRead]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251223205341_InitialNotificationsSchema'
)
BEGIN
    CREATE UNIQUE INDEX [IX_UserNotifications_UserId_NotificationId] ON [UserNotifications] ([UserId], [NotificationId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251223205341_InitialNotificationsSchema'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20251223205341_InitialNotificationsSchema', N'8.0.22');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227141215_AddUserReferenceTable'
)
BEGIN
    CREATE TABLE [UserReferences] (
        [UserId] uniqueidentifier NOT NULL,
        [CreatedAt] datetime2 NOT NULL,
        CONSTRAINT [PK_UserReferences] PRIMARY KEY ([UserId])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227141215_AddUserReferenceTable'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20251227141215_AddUserReferenceTable', N'8.0.22');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227175107_update UserReference'
)
BEGIN
    ALTER TABLE [UserReferences] ADD [Email] nvarchar(max) NOT NULL DEFAULT N'';
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227175107_update UserReference'
)
BEGIN
    CREATE TABLE [EmailOutboxes] (
        [Id] uniqueidentifier NOT NULL,
        [UserId] uniqueidentifier NOT NULL,
        [ToEmail] nvarchar(max) NOT NULL,
        [Subject] nvarchar(max) NOT NULL,
        [Body] nvarchar(max) NOT NULL,
        [Status] tinyint NOT NULL,
        [RetryCount] int NOT NULL,
        [MaxRetries] int NOT NULL,
        [CreatedAt] datetime2 NOT NULL,
        [SentAt] datetime2 NULL,
        [LastError] nvarchar(max) NULL,
        CONSTRAINT [PK_EmailOutboxes] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227175107_update UserReference'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20251227175107_update UserReference', N'8.0.22');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227180224_Add EmailOutbox, PushOutbox, UserDevices entities'
)
BEGIN
    ALTER TABLE [EmailOutboxes] DROP CONSTRAINT [PK_EmailOutboxes];
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227180224_Add EmailOutbox, PushOutbox, UserDevices entities'
)
BEGIN
    EXEC sp_rename N'[EmailOutboxes]', N'EmailOutbox';
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227180224_Add EmailOutbox, PushOutbox, UserDevices entities'
)
BEGIN
    DECLARE @var0 sysname;
    SELECT @var0 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmailOutbox]') AND [c].[name] = N'ToEmail');
    IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [EmailOutbox] DROP CONSTRAINT [' + @var0 + '];');
    ALTER TABLE [EmailOutbox] ALTER COLUMN [ToEmail] nvarchar(256) NOT NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227180224_Add EmailOutbox, PushOutbox, UserDevices entities'
)
BEGIN
    DECLARE @var1 sysname;
    SELECT @var1 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmailOutbox]') AND [c].[name] = N'Subject');
    IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [EmailOutbox] DROP CONSTRAINT [' + @var1 + '];');
    ALTER TABLE [EmailOutbox] ALTER COLUMN [Subject] nvarchar(200) NOT NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227180224_Add EmailOutbox, PushOutbox, UserDevices entities'
)
BEGIN
    DECLARE @var2 sysname;
    SELECT @var2 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmailOutbox]') AND [c].[name] = N'RetryCount');
    IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [EmailOutbox] DROP CONSTRAINT [' + @var2 + '];');
    ALTER TABLE [EmailOutbox] ADD DEFAULT 0 FOR [RetryCount];
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227180224_Add EmailOutbox, PushOutbox, UserDevices entities'
)
BEGIN
    DECLARE @var3 sysname;
    SELECT @var3 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmailOutbox]') AND [c].[name] = N'MaxRetries');
    IF @var3 IS NOT NULL EXEC(N'ALTER TABLE [EmailOutbox] DROP CONSTRAINT [' + @var3 + '];');
    ALTER TABLE [EmailOutbox] ADD DEFAULT 3 FOR [MaxRetries];
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227180224_Add EmailOutbox, PushOutbox, UserDevices entities'
)
BEGIN
    DECLARE @var4 sysname;
    SELECT @var4 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmailOutbox]') AND [c].[name] = N'LastError');
    IF @var4 IS NOT NULL EXEC(N'ALTER TABLE [EmailOutbox] DROP CONSTRAINT [' + @var4 + '];');
    ALTER TABLE [EmailOutbox] ALTER COLUMN [LastError] nvarchar(1000) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227180224_Add EmailOutbox, PushOutbox, UserDevices entities'
)
BEGIN
    DECLARE @var5 sysname;
    SELECT @var5 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmailOutbox]') AND [c].[name] = N'CreatedAt');
    IF @var5 IS NOT NULL EXEC(N'ALTER TABLE [EmailOutbox] DROP CONSTRAINT [' + @var5 + '];');
    ALTER TABLE [EmailOutbox] ADD DEFAULT (GETUTCDATE()) FOR [CreatedAt];
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227180224_Add EmailOutbox, PushOutbox, UserDevices entities'
)
BEGIN
    ALTER TABLE [EmailOutbox] ADD CONSTRAINT [PK_EmailOutbox] PRIMARY KEY ([Id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227180224_Add EmailOutbox, PushOutbox, UserDevices entities'
)
BEGIN
    CREATE TABLE [PushOutbox] (
        [Id] uniqueidentifier NOT NULL,
        [UserId] uniqueidentifier NOT NULL,
        [Title] nvarchar(200) NOT NULL,
        [Body] nvarchar(500) NOT NULL,
        [Status] tinyint NOT NULL,
        [RetryCount] int NOT NULL DEFAULT 0,
        [MaxRetries] int NOT NULL DEFAULT 3,
        [CreatedAt] datetime2 NOT NULL DEFAULT (GETUTCDATE()),
        [SentAt] datetime2 NULL,
        [LastError] nvarchar(1000) NULL,
        CONSTRAINT [PK_PushOutbox] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227180224_Add EmailOutbox, PushOutbox, UserDevices entities'
)
BEGIN
    CREATE TABLE [UserDevices] (
        [Id] uniqueidentifier NOT NULL,
        [UserId] uniqueidentifier NOT NULL,
        [DeviceToken] nvarchar(500) NOT NULL,
        [Platform] tinyint NOT NULL,
        [IsActive] bit NOT NULL DEFAULT CAST(1 AS bit),
        [CreatedAt] datetime2 NOT NULL DEFAULT (GETUTCDATE()),
        CONSTRAINT [PK_UserDevices] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227180224_Add EmailOutbox, PushOutbox, UserDevices entities'
)
BEGIN
    CREATE INDEX [IX_EmailOutbox_Status_CreatedAt] ON [EmailOutbox] ([Status], [CreatedAt]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227180224_Add EmailOutbox, PushOutbox, UserDevices entities'
)
BEGIN
    CREATE INDEX [IX_PushOutbox_Status_CreatedAt] ON [PushOutbox] ([Status], [CreatedAt]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227180224_Add EmailOutbox, PushOutbox, UserDevices entities'
)
BEGIN
    CREATE INDEX [IX_UserDevices_UserId] ON [UserDevices] ([UserId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227180224_Add EmailOutbox, PushOutbox, UserDevices entities'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20251227180224_Add EmailOutbox, PushOutbox, UserDevices entities', N'8.0.22');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260115130852_AddScheduledNotificationsTable'
)
BEGIN
    CREATE TABLE [ScheduledNotifications] (
        [Id] uniqueidentifier NOT NULL,
        [NotificationType] nvarchar(50) NOT NULL,
        [Title] nvarchar(200) NOT NULL,
        [Content] nvarchar(1000) NOT NULL,
        [CourseId] uniqueidentifier NULL,
        [UserIdsJson] nvarchar(max) NOT NULL,
        [ScheduledFor] datetime2 NOT NULL,
        [IsProcessed] bit NOT NULL DEFAULT CAST(0 AS bit),
        [ProcessedAt] datetime2 NULL,
        [CreatedAt] datetime2 NOT NULL DEFAULT (GETUTCDATE()),
        [ErrorMessage] nvarchar(max) NULL,
        CONSTRAINT [PK_ScheduledNotifications] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260115130852_AddScheduledNotificationsTable'
)
BEGIN
    CREATE INDEX [IX_ScheduledNotifications_IsProcessed_ScheduledFor] ON [ScheduledNotifications] ([IsProcessed], [ScheduledFor]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260115130852_AddScheduledNotificationsTable'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260115130852_AddScheduledNotificationsTable', N'8.0.22');
END;
GO

COMMIT;
GO


BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260119130641_AddUserNotificationDeliveriesTable'
)
BEGIN
    CREATE TABLE [UserNotificationDeliveries] (
        [Id] uniqueidentifier NOT NULL,
        [UserNotificationId] uniqueidentifier NOT NULL,
        [Channel] nvarchar(50) NOT NULL,
        [Status] nvarchar(50) NOT NULL,
        [DeliveredAt] datetime2 NULL,
        [ErrorMessage] nvarchar(1000) NULL,
        [ProviderMessageId] nvarchar(200) NULL,
        [CreatedAt] datetime2 NOT NULL DEFAULT (GETUTCDATE()),
        CONSTRAINT [PK_UserNotificationDeliveries] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260119130641_AddUserNotificationDeliveriesTable'
)
BEGIN
    CREATE INDEX [IX_UserNotificationDeliveries_Channel_Status] ON [UserNotificationDeliveries] ([Channel], [Status]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260119130641_AddUserNotificationDeliveriesTable'
)
BEGIN
    CREATE INDEX [IX_UserNotificationDeliveries_UserNotificationId] ON [UserNotificationDeliveries] ([UserNotificationId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260119130641_AddUserNotificationDeliveriesTable'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260119130641_AddUserNotificationDeliveriesTable', N'8.0.22');
END;
GO

COMMIT;
GO