using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using IdentityServer4.Validation;
using Newtonsoft.Json;

namespace STS.Helpers
{
    public class PermissionHelper
    {
        public static bool HasPermissions(IEnumerable<Claim> claims, params string[] permissionsNeeded)
        {
            var permissionsClaims = from c in claims
                where c.Type == "permissions" || c.Type == "client_permissions"
                select c;

            var claimsArray = permissionsClaims as Claim[] ?? permissionsClaims.ToArray();
            if (!claimsArray.Any())
            {
                return false;
            }

            var permissionsList = claimsArray.First();

            if (permissionsList == null)
            {
                return false;
            }

            var permissions = JsonConvert.DeserializeObject<List<string>>(permissionsList.Value);

            return permissionsNeeded.All(permission => permissions.Contains(permission));
        }
    }
}