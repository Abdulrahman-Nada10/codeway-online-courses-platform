// ============================================================
// CreateOrderDto.cs - What the frontend sends to create an order
// ============================================================
// WHY THIS EXISTS:
//   Instead of passing raw entity objects from the frontend (security risk!),
//   we accept only the minimum data needed.
//
// FLOW:
//   Frontend → POST /api/payment/create → Controller → OrderService.CreateOrderAsync(dto)
//
// NOTE:
//   CourseIds are resolved to names+prices by calling CourseManagement service
//   inside OrderService. The frontend never sends prices - always trust the server.

namespace OnlineCourse.Payment.Application.DTOs.Requests
{
    public class CreateOrderDto
    {
        // List of course IDs the user wants to purchase e.g: [1, 5, 12]
        public List<int> CourseIds { get; set; } = [];

        // Billing data required by Paymob when creating the payment intention
        public BillingDataDto BillingData { get; set; } = null!;
    }

    // Required by Paymob's Create Intention API
    // These fields map to "billing_data" in the Paymob request body
    public class BillingDataDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
    }
}
