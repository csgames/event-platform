using System;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using STS.Helpers;

namespace STS.Attributes
{
    public class RequiresPermissionsAttribute : TypeFilterAttribute
    {
        public RequiresPermissionsAttribute(params string[] permissionsNeeded) : base(typeof(RequiresPermissionsFilter))
        {
            Arguments = new object[] {permissionsNeeded};
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
            if (!PermissionHelper.HasPermissions(context.HttpContext.User.Claims, _permissionsNeeded))
            {
                context.Result = new ForbidResult();
            }
        }
    }
}