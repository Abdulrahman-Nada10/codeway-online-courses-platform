using System.Text.Json.Serialization;

namespace OnlineCourse.Payment.DTOs
{
    public class PaymobCallbackDto
    {
        public PaymobTransactionObj? Obj { get; set; }
    }

    public class PaymobTransactionObj
    {
        [JsonPropertyName("id")]
        public long Id { get; set; }

        [JsonPropertyName("success")]
        public bool Success { get; set; }

        [JsonPropertyName("is_voided")]
        public bool IsVoided { get; set; }

        [JsonPropertyName("amount_cents")]
        public long AmountCents { get; set; }

        [JsonPropertyName("created_at")]
        public string? CreatedAt { get; set; }

        [JsonPropertyName("currency")]
        public string? Currency { get; set; }

        [JsonPropertyName("error_occured")]
        public bool ErrorOccured { get; set; }

        [JsonPropertyName("has_parent_transaction")]
        public bool HasParentTransaction { get; set; }

        [JsonPropertyName("integration_id")]
        public long IntegrationId { get; set; }

        [JsonPropertyName("is_3d_secure")]
        public bool Is3dSecure { get; set; }

        [JsonPropertyName("is_auth")]
        public bool IsAuth { get; set; }

        [JsonPropertyName("is_capture")]
        public bool IsCapture { get; set; }

        [JsonPropertyName("is_refunded")]
        public bool IsRefunded { get; set; }

        [JsonPropertyName("is_standalone_payment")]
        public bool IsStandalonePayment { get; set; }

        [JsonPropertyName("owner")]
        public long Owner { get; set; }

        [JsonPropertyName("pending")]
        public bool Pending { get; set; }

        // = our Order.Id.ToString() sent when creating the intention
        [JsonPropertyName("merchant_order_id")]
        public string? MerchantOrderId { get; set; }

        [JsonPropertyName("order")]
        public PaymobOrderRef? Order { get; set; }

        [JsonPropertyName("source_data")]
        public PaymobSourceData? SourceData { get; set; }
    }

    public class PaymobOrderRef
    {
        [JsonPropertyName("id")]
        public long Id { get; set; }
    }

    public class PaymobSourceData
    {
        // Last 4 digits of card
        [JsonPropertyName("pan")]
        public string? Pan { get; set; }

        // e.g. "MasterCard", "Visa"
        [JsonPropertyName("sub_type")]
        public string? SubType { get; set; }

        // "card", "wallet", "kiosk"
        [JsonPropertyName("type")]
        public string? Type { get; set; }
    }
}
