using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using IdentityModel;
using Newtonsoft.Json;
using STS.Interface;
using STS.Models;

namespace STS.Helpers
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
                new Claim("permissions", JsonConvert.SerializeObject(permissions) ?? "[]"),
                new Claim(JwtClaimTypes.Role, role.Name),
                new Claim("email", user.Email ?? ""),
                new Claim("firstname", user.FirstName ?? ""),
                new Claim("lastname", user.LastName ?? ""),
                new Claim("birthdate", user.BirthDate ?? ""),
                new Claim("validated", user.Validated.ToString())
            };
        }
    }
}