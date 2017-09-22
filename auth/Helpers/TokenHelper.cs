using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore.Query.ExpressionTranslators.Internal;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using SecureTokenService.Config;
using SecureTokenService.Redis;
using SecureTokenService.Users;

namespace SecureTokenService.Helpers
{
    public class TokenHelper: ITokenHelper
    {
        private const string RefreshTokenString = "refreshtokens";

        private readonly string _secret = ConfigManager.JWTSecret;
        private readonly TimeSpan _expiration = ConfigManager.JWTExpirationTime;

        private readonly TimeSpan _refreshExpiration = ConfigManager.RefreshTokenExpirationTime;

        private readonly RedisManager _redisManager;

        public TokenHelper(RedisManager redisManager)
        {
            _redisManager = redisManager;
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
            var info = new
            {
                IssuedTo = user.Id,
                IssuedAt = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.Add(_refreshExpiration)
            };

            _redisManager.Client.Add($"{RefreshTokenString}:{user.Id}", key);
            _redisManager.Client.AddItemToSet(key.ToString(), JsonConvert.SerializeObject(info));
            return "";
        }
    }
}