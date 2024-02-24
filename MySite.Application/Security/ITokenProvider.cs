namespace MySite.Application.Security;

public interface ITokenProvider
{
    string GetToken(UserClaims userClaims);
}