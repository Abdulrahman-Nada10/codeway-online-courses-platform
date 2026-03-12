namespace OnlineCourse.Payment.DTOs
{
    public class PaymentIntentionResponseDto
    {
        public int OrderId { get; set; }
        public string ClientSecret { get; set; } = string.Empty;
        public string PublicKey { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
    }
}
