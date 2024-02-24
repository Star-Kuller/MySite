using Microsoft.AspNetCore.Identity;

namespace MySite.Domain.Entities.User;

public class UserToken : IdentityUserToken<long>
{
    public virtual User User { get; set; }
}