using MySite.Application.Security;
using Users = MySite.Domain.Entities.User;

namespace MySite.Security
{
    public class CurrentUser : ICurrentUser
    {
        public long Id { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string IpAddress { get; set; }
        public string UserAgent { get; set; }

        public bool IsAdmin => Role == Users.Role.Administrator;
        public bool IsStandard => Role == Users.Role.Standard;
    }
}
