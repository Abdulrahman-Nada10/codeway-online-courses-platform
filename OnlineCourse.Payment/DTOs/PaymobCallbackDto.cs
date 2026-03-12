namespace OnlineCourse.Payment.DTOs
{
    public class PaymobCallbackDto
    {
        public PaymobTransactionObj? Obj { get; set; }
        public string? Hmac { get; set; }
    }

    public class PaymobTransactionObj
    {
        public long Id { get; set; }
        public bool Success { get; set; }
        public bool IsVoided { get; set; }
        public long AmountCents { get; set; }
        public string? MerchantOrderId { get; set; }
        public string? SourceDataType { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
