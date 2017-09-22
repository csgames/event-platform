using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Query.ExpressionTranslators.Internal;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using SecureTokenService.Config;
using SecureTokenService.Redis;
using SecureTokenService.Users;

namespace SecureTokenService.Helpers
{
    public class TokenInfo
    {
        public string IssuedTo;
        public DateTime IssuedAt;
        public DateTime ExpiresAt;
    }
    
    public class TokenHelper: ITokenHelper
    {
        private const string RefreshTokenString = "refreshtokens";

        private readonly string _secret = ConfigManager.JWTSecret;
        private readonly TimeSpan _expiration = ConfigManager.JWTExpirationTime;

        private readonly TimeSpan _refreshExpiration = ConfigManager.RefreshTokenExpirationTime;

        private readonly RedisManager _redisManager;
        private readonly IUserRepository _userRepository;

        public TokenHelper(RedisManager redisManager, IUserRepository userRepository)
        {
            _redisManager = redisManager;
            _userRepository = userRepository;
        }

        public string GenerateJWT(UserModel user)
        {
            var symmetricKey = Convert.FromBase64String(_secret);
            var tokenHandler = new JwtSecurityTokenHandler();

            var now = DateTime.UtcNow;
            var permissionClaims = user.Role.Permissions.Select(permission => permission.Name).ToList();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.Role.Name),
                    new Claim("permissions", JsonConvert.SerializeObject(permissionClaims))
                }),

                Expires = now.AddMinutes(_expiration.TotalMinutes),

                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(symmetricKey),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var stoken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(stoken);

            return token;
        }

        public string GenerateRefreshToken(UserModel user)
        {
            var key = Guid.NewGuid();
            var info = new TokenInfo()
            {
                IssuedTo = user.Id,
                IssuedAt = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.Add(_refreshExpiration)
            };

            _redisManager.Client.AddItemToSet($"{RefreshTokenString}:{user.Id}", key.ToString());
            _redisManager.Client.Set(key.ToString(), JsonConvert.SerializeObject(info));
            return key.ToString();
        }

        public TokenInfo GetTokenInfo(string token)
        {
            var info =_redisManager.Client.Get<string>(token);
            if (info == null)
            {
                throw new Exception("Invalid refresh token.");
            }
            var infoObj = JsonConvert.DeserializeObject<TokenInfo>(info);
            return infoObj;
        }
        
        public bool IsRefreshTokenValid(string token)
        {
            try
            {
                var info = GetTokenInfo(token);

                return info.ExpiresAt > DateTime.UtcNow;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<UserModel> GetUserForRefreshToken(string token)
        {
            var obj = GetTokenInfo(token);

            var user = await _userRepository.GetById(obj.IssuedTo);
            
            if (IsRefreshTokenValid(token))
            {
                _redisManager.Client.Remove(token);
                _redisManager.Client.RemoveItemFromSet($"{RefreshTokenString}:{user.Id}", token);
                throw new Exception("Refresh token is expired.");
            }

            return user;
        }
    }
}