// ============================================================
// Program.cs - Entry point for OnlineCourse.Payment Web API
// ============================================================
// TODO: Register all services here in this order:
//
// 1. AddDbContext<ApplicationDbContext>()
//    - Use builder.Configuration.GetConnectionString("DefaultConnection")
//
// 2. Register Repositories (Scoped):
//    - AddScoped<IOrderRepository, OrderRepository>()
//    - AddScoped<IPaymentTransactionRepository, PaymentTransactionRepository>()
//
// 3. Register Unit of Work (Scoped):
//    - AddScoped<IUOW, UnitOfWork>()
//
// 4. Register Application Services (Scoped):
//    - AddScoped<IOrderService, OrderService>()
//    - AddScoped<IPaymobService, PaymobService>()
//
// 5. Register HttpClient for Paymob:
//    - AddHttpClient("Paymob", client => {
//        client.BaseAddress = new Uri(builder.Configuration["Paymob:BaseUrl"]);
//      })
//
// 6. Register AutoMapper:
//    - AddAutoMapper(typeof(PaymentMappingProfile))
//
// 7. Register JWT Authentication:
//    - AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//      .AddJwtBearer(options => { ... read key from config ... })
//
// 8. AddControllers(), AddEndpointsApiExplorer(), AddSwaggerGen()
//
// 9. Middleware pipeline:
//    - UseSwagger(), UseSwaggerUI()
//    - UseAuthentication() BEFORE UseAuthorization()
//    - MapControllers()
