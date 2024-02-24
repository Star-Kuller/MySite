namespace MySite.Application.Security;

public interface ICurrentUser
{
    long Id { get; set; }
    string Email { get; set; }
    string Role { get; set; }
    public string IpAddress { get; set; }
    public string UserAgent { get; set; }
}