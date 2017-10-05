using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using IdentityModel;
using Newtonsoft.Json;
using STS.Interface;

namespace STS.User
{
    public static class UserHelper
    {
        public static IEnumerable<Claim> GetUserClaims(User user, IRepository _db)
        {
            var role = _db.Single<Role>(r => r.Id == user.RoleId);
            var permissions = _db.Where<Permission>(p => role.Permissions.Contains(p.Id))
                .Select(p => p.Name);
            return new[]
            {
                new Claim("user_id", user.Id ?? ""),
                new Claim(JwtClaimTypes.Name, user.Username ?? ""),
                new Claim("permissions", JsonConvert.SerializeObject(permissions) ?? "blbsdmvklds"),
                new Claim(JwtClaimTypes.Role, role.Name)
            };
        }
    }
}