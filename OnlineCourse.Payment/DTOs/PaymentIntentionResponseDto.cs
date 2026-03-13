namespace OnlineCourse.Payment.DTOs
{
    public class PaymentIntentionResponseDto
    {
        public int OrderId { get; set; }
        // Frontend passes this to Paymob JS SDK to open checkout popup
        public string ClientSecret { get; set; } = string.Empty;
        // Frontend also needs this for the Paymob JS SDK
        public string PublicKey { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        // Frontend redirects user to this URL to complete payment
        public string PaymentUrl { get; set; } = string.Empty;
    }
}
