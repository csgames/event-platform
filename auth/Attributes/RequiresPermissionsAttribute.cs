using System.Collections.Generic;
using System.Linq;
using JWT.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;

namespace STS.Attributes
{
    public class RequiresPermissionsAttribute : TypeFilterAttribute
    {
        public RequiresPermissionsAttribute(params string[] permissionsNeeded) : base(typeof(RequiresPermissionsFilter))
        {
            Arguments = new object[] { permissionsNeeded };
        }
    }

    public class RequiresPermissionsFilter : IAuthorizationFilter
    {
        private readonly string[] _permissionsNeeded;

        public RequiresPermissionsFilter(string[] permissionsNeeded)
        {
            _permissionsNeeded = permissionsNeeded;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (!HasPermissions(context.HttpContext.Request.Headers))
            {
                context.Result = new ForbidResult();
            }
        }

        private bool HasPermissions(IHeaderDictionary headers)
        {
            var claims = GetClaims(headers);
            if (claims == null)
            {
                return false;
            }

            if (claims.TryGetValue("permissions", out var permissions))
            {
                var permissionsList = JsonConvert.DeserializeObject<List<string>>(permissions as string);

                return _permissionsNeeded.All(permission => permissionsList.Contains(permission));
            }

            if (claims.TryGetValue("client_permissions", out var clientPermissions))
            {
                var permissionsList = JsonConvert.DeserializeObject<List<string>>(clientPermissions as string);

                return _permissionsNeeded.All(permission => permissionsList.Contains(permission));
            }

            return false;
        }

        private IDictionary<string, object> GetClaims(IHeaderDictionary headers)
        {
            if (headers.TryGetValue("Authorization", out var token))
            {
                var parts = token.ToString().Remove(0, "Bearer ".Length);
                return new JwtBuilder()
                    .Decode<IDictionary<string, object>>(parts);
            }

            return null;
        }
    }
}