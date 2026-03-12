namespace OnlineCourse.Payment.DTOs
{
    public class PaymobCallbackDto
    {
        public PaymobTransactionObj? Obj { get; set; }
        // HMAC from Paymob - ALWAYS validate before processing
        public string? Hmac { get; set; }
    }

    public class PaymobTransactionObj
    {
        public long Id { get; set; }
        public bool Success { get; set; }
        public bool IsVoided { get; set; }
        // In cents - divide by 100 for EGP
        public long AmountCents { get; set; }
        // = our Order.Id.ToString() sent when creating the intention
        public string? MerchantOrderId { get; set; }
        // "card", "wallet", "kiosk"
        public string? SourceDataType { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
