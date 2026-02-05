/* ============================================================
   Database   : OnlineCourseDB
   Object     : dbo.sp_CreateNotification
   Purpose    : Create a notification and dispatch it to users
                based on their notification preferences.

   Notes:
   - Uses Table-Valued Parameter (TVP) to receive multiple UserIds.
   - Does NOT create users.
   - Only sends notifications to users that already exist
     in UserReferences and have preferences configured.
   - Implements Outbox Pattern for Email and Push notifications.
   ============================================================ */

USE [OnlineCourseDB];
GO

/* ============================================================
   1️⃣ User-defined Table Type
   ------------------------------------------------------------
   Purpose:
   - Used to pass a list of UserIds from the application layer
     to SQL Server in a single call.
   ============================================================ */
IF TYPE_ID(N'dbo.UserIdTableType') IS NULL
BEGIN
    CREATE TYPE dbo.UserIdTableType AS TABLE
    (
        UserId UNIQUEIDENTIFIER NOT NULL
    );
END
GO

/* ============================================================
   Stored Procedure: sp_CreateNotification
   ============================================================ */
CREATE OR ALTER PROCEDURE dbo.sp_CreateNotification
    @Type NVARCHAR(50),
    @Title NVARCHAR(200),
    @Content NVARCHAR(1000),
    @CourseId UNIQUEIDENTIFIER = NULL,
    @ExpiryAt DATETIME2 = NULL,
    @UserIds dbo.UserIdTableType READONLY
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRAN;

    BEGIN TRY
        ----------------------------------------------------
        -- Create Notification
        ----------------------------------------------------
        DECLARE @NotificationId UNIQUEIDENTIFIER = NEWID();

        INSERT INTO dbo.Notifications
            (Id, Type, Title, Content, CourseId, CreatedAt, ExpiryAt)
        VALUES
            (@NotificationId, @Type, @Title, @Content, @CourseId, GETUTCDATE(), @ExpiryAt);
        
        ----------------------------------------------------
        -- Prepare return table for inserted UserNotification IDs
        ----------------------------------------------------
        DECLARE @InsertedUserNotifications TABLE
        (
            UserNotificationId UNIQUEIDENTIFIER NOT NULL
        );

        ----------------------------------------------------
        -- In-App Notifications
        ----------------------------------------------------
        INSERT INTO dbo.UserNotifications
            (Id, NotificationId, UserId, IsRead, DeliveredAt)
        OUTPUT INSERTED.Id INTO @InsertedUserNotifications(UserNotificationId)
        SELECT
            NEWID(),
            @NotificationId,
            u.UserId,
            0,
            GETUTCDATE()
        FROM @UserIds u
        INNER JOIN dbo.UserReferences ur
            ON ur.UserId = u.UserId
        INNER JOIN dbo.NotificationPreferences p
            ON p.UserId = u.UserId
           AND p.NotificationType = @Type
        WHERE p.InApp = 1;

        ----------------------------------------------------
        -- Email Outbox
        ----------------------------------------------------
        INSERT INTO dbo.EmailOutbox
            (Id, UserId, ToEmail, Subject, Body, Status, CreatedAt)
        SELECT
            NEWID(),
            u.UserId,
            ur.Email,
            @Title,
            @Content,
            0,
            GETUTCDATE()
        FROM @UserIds u
        INNER JOIN dbo.UserReferences ur
            ON ur.UserId = u.UserId
        INNER JOIN dbo.NotificationPreferences p
            ON p.UserId = u.UserId
           AND p.NotificationType = @Type
        WHERE p.Email = 1;

        ----------------------------------------------------
        -- Push Outbox
        ----------------------------------------------------
        INSERT INTO dbo.PushOutbox
            (Id, UserId, Title, Body, Status, CreatedAt)
        SELECT
            NEWID(),
            u.UserId,
            @Title,
            @Content,
            0,
            GETUTCDATE()
        FROM @UserIds u
        INNER JOIN dbo.UserReferences ur
            ON ur.UserId = u.UserId
        INNER JOIN dbo.NotificationPreferences p
            ON p.UserId = u.UserId
           AND p.NotificationType = @Type
        WHERE p.Push = 1;

        COMMIT;

        ----------------------------------------------------
        -- Return the inserted UserNotification IDs
        ----------------------------------------------------
        SELECT UserNotificationId
        FROM @InsertedUserNotifications;

    END TRY
    BEGIN CATCH
        ROLLBACK;
        THROW;
    END CATCH
END;
