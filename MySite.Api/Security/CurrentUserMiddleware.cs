using System.Security.Claims;
using Grpc.Core;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MySite.Application.Security;
using MySite.Domain.Entities.User;

namespace MySite.Security
{
    public class CurrentUserMiddleware : IMiddleware
    {
        private readonly ICurrentUser _currentUser;
        private readonly UserManager<User> _userManager;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserMiddleware(
            ICurrentUser currentUser, UserManager<User> userManager, IHttpContextAccessor httpContextAccessor)
        {
            _currentUser = currentUser;
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            if (context.User.Identity != null && !context.User.Identity.IsAuthenticated)
            {
                await next(context);
                return;
            }

            if (!long.TryParse(context.User.FindFirst(ClaimTypes.Sid)?.Value, out var userId))
            {
                await next(context);
                return;
            }

            var user = await _userManager
                .Users
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                await next(context);
                return;
            }
            _currentUser.Id = user.Id;
            _currentUser.Email = user.Email;
            _currentUser.Role = context.User.FindFirst(ClaimTypes.Role)?.Value;
            _currentUser.IpAddress = _httpContextAccessor.HttpContext?.Connection?.RemoteIpAddress?.MapToIPv4()?.ToString();
            _currentUser.UserAgent = GetHeaderValue("User-Agent");
            await next(context);
        }

        private string GetHeaderValue(string headerName)
        {
            var headers = _httpContextAccessor.HttpContext?.Request?.Headers;
            if (headers != null && headers.ContainsKey(headerName))
                return headers["User-Agent"].FirstOrDefault();

            return string.Empty;
        }
    }
}
