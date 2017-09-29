using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using SecureTokenService.Users;
using ServiceStack;

namespace SecureTokenService.Helpers
{
    public interface ITokenHelper
    {
        string GenerateJWT(UserModel user);
        SecurityToken ValidateJWT(string token, string[] permissions);
        string GenerateRefreshToken(UserModel user);
        Task<UserModel> GetUserForRefreshToken(string token);
        bool IsRefreshTokenValid(string token);
        TokenInfo GetTokenInfo(string token);
    }
}