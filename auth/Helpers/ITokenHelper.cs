using System.Threading.Tasks;
using SecureTokenService.Users;

namespace SecureTokenService.Helpers
{
    public interface ITokenHelper
    {
        string GenerateJWT(UserModel user);
        string GenerateRefreshToken(UserModel user);
        Task<UserModel> GetUserForRefreshToken(string token);
        bool IsRefreshTokenValid(string token);
        TokenInfo GetTokenInfo(string token);
    }
}