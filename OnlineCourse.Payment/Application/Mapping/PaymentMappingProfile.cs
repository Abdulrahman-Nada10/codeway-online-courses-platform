// ============================================================
// PaymentMappingProfile.cs - AutoMapper configuration
// ============================================================
// WHY THIS EXISTS:
//   Instead of manually mapping obj.Prop = entity.Prop everywhere,
//   AutoMapper handles Entity -> DTO conversions automatically.
//   Register in Program.cs: AddAutoMapper(typeof(PaymentMappingProfile))

using AutoMapper;

namespace OnlineCourse.Payment.Application.Mapping
{
    public class PaymentMappingProfile : Profile
    {
        public PaymentMappingProfile()
        {
            // TODO: Add these mappings:
            //
            // CreateMap<Order, OrderResponseDto>()
            //     .ForMember(dest => dest.Status,
            //         opt => opt.MapFrom(src => src.Status.ToString()))
            //     .ForMember(dest => dest.Items,
            //         opt => opt.MapFrom(src => src.OrderItems));
            //
            // CreateMap<OrderItem, OrderItemResponseDto>();
        }
    }
}
