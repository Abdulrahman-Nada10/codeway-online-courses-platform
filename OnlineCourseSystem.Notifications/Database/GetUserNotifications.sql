
CREATE PROCEDURE sp_GetUserNotifications
    @UserId UNIQUEIDENTIFIER,
    @IsRead BIT = NULL,
    @PageNumber INT = 1,
    @PageSize INT = 20
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        n.Id            AS NotificationId,
        n.Type          AS [Type],
        n.Title,
        n.Content,
        n.CourseId,
        n.CreatedAt     AS CreatedAt,

		un.IsRead       AS IsRead,
        un.ReadAt       AS ReadAt
    FROM UserNotifications un
    INNER JOIN Notifications n
        ON n.Id = un.NotificationId
    WHERE un.UserId = @UserId
      AND (@IsRead IS NULL OR un.IsRead = @IsRead)
    ORDER BY n.CreatedAt DESC
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;
END;
