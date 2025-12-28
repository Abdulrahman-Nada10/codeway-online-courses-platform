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
   2️⃣ Stored Procedure: sp_CreateNotification
   ============================================================ */
CREATE OR ALTER PROCEDURE dbo.sp_CreateNotification
    @Type NVARCHAR(50),                    -- Notification type (Enum as string)
    @Title NVARCHAR(200),                  -- Notification title
    @Content NVARCHAR(1000),               -- Notification content
    @CourseId UNIQUEIDENTIFIER = NULL,     -- Optional related entity
    @ExpiryAt DATETIME2 = NULL,            -- Optional expiry date
    @UserIds dbo.UserIdTableType READONLY  -- List of target users
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;

    BEGIN TRY
        /* ====================================================
           Create Notification (Master Record)
           ==================================================== */
        DECLARE @NotificationId UNIQUEIDENTIFIER = NEWID();

        INSERT INTO dbo.Notifications
        (
            Id,
            Type,
            Title,
            Content,
            CourseId,
            CreatedAt,
            ExpiryAt
        )
        VALUES
        (
            @NotificationId,
            @Type,
            @Title,
            @Content,
            @CourseId,
            GETUTCDATE(),
            @ExpiryAt
        );

        /* ====================================================
           In-App Notifications
           ----------------------------------------------------
           Rules:
           - User must exist in UserReferences
           - User must have InApp enabled for this notification type
           ==================================================== */
        INSERT INTO dbo.UserNotifications
        (
            Id,
            NotificationId,
            UserId,
            IsRead
        )
        SELECT
            NEWID(),
            @NotificationId,
            u.UserId,
            0
        FROM @UserIds u
        INNER JOIN dbo.UserReferences ur
            ON ur.UserId = u.UserId
        INNER JOIN dbo.NotificationPreferences p
            ON p.UserId = u.UserId
           AND p.NotificationType = @Type
        WHERE p.InApp = 1;

        /* ====================================================
           Email Outbox (Async Processing)
           ----------------------------------------------------
           Rules:
           - User must exist
           - Email notifications must be enabled
           - Email sending is handled asynchronously
           ==================================================== */
        INSERT INTO dbo.EmailOutbox
        (
            Id,
            UserId,
            ToEmail,
            Subject,
            Body,
            Status,
            CreatedAt
        )
        SELECT
            NEWID(),
            u.UserId,
            ur.Email,
            @Title,
            @Content,
            0,              -- Pending
            GETUTCDATE()
        FROM @UserIds u
        INNER JOIN dbo.UserReferences ur
            ON ur.UserId = u.UserId
        INNER JOIN dbo.NotificationPreferences p
            ON p.UserId = u.UserId
           AND p.NotificationType = @Type
        WHERE p.Email = 1;

        /* ====================================================
           Push Outbox (Async Processing)
           ----------------------------------------------------
           Rules:
           - User must exist
           - Push notifications must be enabled
           ==================================================== */
        INSERT INTO dbo.PushOutbox
        (
            Id,
            UserId,
            Title,
            Body,
            Status,
            CreatedAt
        )
        SELECT
            NEWID(),
            u.UserId,
            @Title,
            @Content,
            0,              -- Pending
            GETUTCDATE()
        FROM @UserIds u
        INNER JOIN dbo.UserReferences ur
            ON ur.UserId = u.UserId
        INNER JOIN dbo.NotificationPreferences p
            ON p.UserId = u.UserId
           AND p.NotificationType = @Type
        WHERE p.Push = 1;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO
