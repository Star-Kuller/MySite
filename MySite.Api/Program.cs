using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MySite.Application.Features.Account;
using MySite.Application.Interfaces;
using MySite.Application.Security;
using MySite.Domain.Entities.User;
using MySite.Infrastructure;
using MySite.Security;
using MySite.Services;

var builder = WebApplication.CreateBuilder(args);

// Additional configuration is required to successfully run gRPC on macOS.
// For instructions on how to configure Kestrel and gRPC clients on macOS, visit https://go.microsoft.com/fwlink/?linkid=2099682

// Add services to the container.
var services = builder.Services;
services.AddGrpc();
services.AddCors(o => o.AddPolicy("AllowAll", builder =>
{
    builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader()
        .WithExposedHeaders("Grpc-Status", "Grpc-Message", "Grpc-Encoding", "Grpc-Accept-Encoding");
}));

services.AddMediatR(typeof(Login).Assembly);

services.Configure<AdminUser>(builder.Configuration.GetSection("AdminUser"));
services.AddDbContext<MyDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Database")));
services.AddTransient<IMyDbContext, MyDbContext>();

services.AddAuthorization();

//Add authentication            
services.Configure<TokenManagement>(builder.Configuration.GetSection("TokenManagement"));
var token = builder.Configuration.GetSection("TokenManagement").Get<TokenManagement>();

services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = token.SecurityKey,
        ValidIssuer = token.Issuer,
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidAudience = token.Audience,
        ValidateLifetime = true,
        RoleClaimType = ClaimTypes.Role
    };
});
services.AddTransient<ITokenProvider, JwtTokenProvider>();
services.AddScoped<ICurrentUser, CurrentUser>();
services.AddTransient<CurrentUserMiddleware>();

services.AddIdentity<User, Role>(options =>
    {
        options.Password.RequiredLength = 6;
        options.Password.RequireLowercase = false;
        options.Password.RequireUppercase = false;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireDigit = false;
        options.User.RequireUniqueEmail = true;

        //For email confirmations and reset passwords using email token provider that generate 6 digits short lived code.
        options.Tokens.EmailConfirmationTokenProvider = TokenOptions.DefaultEmailProvider;
        options.Tokens.PasswordResetTokenProvider = TokenOptions.DefaultEmailProvider;
    })
    .AddEntityFrameworkStores<MyDbContext>()
    .AddDefaultTokenProviders();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseGrpcWeb();
app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<CurrentUserMiddleware>();

app.MapGrpcService<GreeterService>().EnableGrpcWeb().RequireCors("AllowAll");
app.MapGrpcService<AuthorizationService>().EnableGrpcWeb().RequireCors("AllowAll");
app.MapGet("/",
    () =>
        "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

using (var scope = app.Services.CreateScope())
{
    var servicesProvider = scope.ServiceProvider;
    var logger = servicesProvider.GetRequiredService<ILogger<Program>>();
    try
    {
        if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Remote")
        {
            return;
        }

        await DatabaseInitializer.InitializeAsync(servicesProvider);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Applying database migrations error.");
    }
}

app.Run("http://localhost:5001");