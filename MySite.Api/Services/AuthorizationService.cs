using Grpc.Core;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using MySite.Application.Features.Account;
using MySite.protobufs;
using Base = MySite.protobufs.AuthorizationService.AuthorizationServiceBase;
namespace MySite.Services;

[AllowAnonymous]
public class AuthorizationService : Base
{
    private readonly ILogger<AuthorizationService> _logger;
    private readonly IMediator _mediator;
    
    public AuthorizationService(ILogger<AuthorizationService> logger, IMediator mediator)
    {
        _logger = logger;
        _mediator = mediator;
    }

    public override async Task<TokenReply> Login(LoginRequest request, ServerCallContext context)
    {
        _logger.LogInformation($"Login: {request.Email} Password: {request.Password}");
        try
        {
            var token = await _mediator.Send(new Login.Command
            {
                Email = request.Email,
                Password = request.Password
            });
            
            return new TokenReply
            {
                JwtToken = token
            };
        }
        catch (Exception e)
        {
            _logger.LogWarning(e.Message);
            return new TokenReply
            {
                Error = e.Message
            };
        }
    }

    public override Task<TokenReply> Registration(RegistrationRequest request, ServerCallContext context)
    {
        return base.Registration(request, context);
    }
}