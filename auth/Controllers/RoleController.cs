using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using STS.Interface;
using STS.User;

namespace STS.Controllers
{
    
    [Route("role")]
    public class RoleController : Controller
    {        
        private readonly IRepository _db;

        public RoleController(IRepository db)
        {
            _db = db;
        }

        [Authorize]
        [HttpGet]
        public Task<IActionResult> GetAll()
        {
            return Task.Run<IActionResult>(() =>
            {
                var permissionsClaim =
                (from c in HttpContext.User.Claims
                    where c.Type == "permissions" || c.Type == "client_permissions"
                    select c).First();

                if (permissionsClaim == null)
                {
                    return Forbid();
                }

                var permissions = JsonConvert.DeserializeObject<List<string>>(permissionsClaim.Value);

                if (!permissions.Contains("sts:read-all:role"))
                {
                    return Forbid();
                }

                var roles = _db.All<Role>();
                return Ok(new
                {
                    success = true,
                    roles
                });
            });
        }
    }
}