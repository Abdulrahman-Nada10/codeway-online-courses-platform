namespace GlobalResponse.Shared.Models;

public class PagedResponse<T>
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public IEnumerable<T>? Data { get; set; }
    public int TotalRecords { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalPages => (int)Math.Ceiling(TotalRecords / (double)PageSize);
    public int StatusCode { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;

    public static PagedResponse<T> SuccessResponse(
        IEnumerable<T> data,
        int totalRecords,
        int pageNumber,
        int pageSize,
        string message = "Success")
    {
        return new PagedResponse<T>
        {
            Success = true,
            Message = message,
            Data = data,
            TotalRecords = totalRecords,
            PageNumber = pageNumber,
            PageSize = pageSize,
            StatusCode = 200
        };
    }
}
