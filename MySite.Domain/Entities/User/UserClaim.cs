using Microsoft.AspNetCore.Identity;

namespace MySite.Domain.Entities.User;

public class UserClaim : IdentityUserClaim<long>
{
    public virtual User User { get; set; }
}