using SecureTokenService.Users;

namespace SecureTokenService.Helpers
{
    public interface ITokenHelper
    {
        string GenerateJWT(UserModel user);
        string GenerateRefreshToken(UserModel user);
    }
}