using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using IdentityServer4.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using STS.Attributes;
using STS.Inputs;
using STS.Interface;
using STS.Models;

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
        [RequiresPermissions("sts:get-all:role")]
        [HttpGet]
        public Task<IActionResult> GetAll()
        {
            return Task.Run<IActionResult>(() =>
            {
                var roles = _db.All<Role>();
                return Ok(new
                {
                    success = true,
                    roles
                });
            });
        }

        [Authorize]
        [RequiresPermissions("sts:get:role")]
        [HttpGet("{id}")]
        public Task<IActionResult> Get(string id)
        {
            return Task.Run<IActionResult>(() =>
            {
                var role = _db.Single<Role>(r => r.Id == id);
                return Ok(new
                {
                    success = true,
                    role
                });
            });
        }
        
        
        [Authorize]
        [RequiresPermissions("sts:create:role")]
        [HttpPost]
        public Task<IActionResult> Create(RoleInput input)
        {
            return Task.Run<IActionResult>(() =>
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                var roleExists = _db.Where<Role>(r => r.Name == input.Name).Any();

                if (roleExists)
                {
                    return new StatusCodeResult((int) HttpStatusCode.Conflict);
                }

                var role = new Role()
                {
                    Name = input.Name,
                    Permissions = input.Permissions
                };

                _db.Add(role);

                return Ok(new {success = true});
            });
        }

        [Authorize]
        [RequiresPermissions("sts:update:role")]
        [HttpPut("{id}")]
        public Task<IActionResult> Update(string id, RoleInput input)
        {
            return Task.Run<IActionResult>(() =>
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                var roleExists = _db.Single<Role>(r => r.Id == id) != null;

                if (!roleExists)
                {
                    return new StatusCodeResult((int) HttpStatusCode.NotFound);
                }

                var role = new Role()
                {
                    Id = id,
                    Name = input.Name,
                    Permissions = input.Permissions
                };
                _db.Replace(r => r.Id == id, role);

                return Ok(new {success = true});
            });
        }
        
        [Authorize]
        [RequiresPermissions("sts:delete:role")]
        [HttpDelete("{id}")]
        public Task<IActionResult> Delete(string id)
        {
            return Task.Run<IActionResult>(() =>
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }
                
                _db.Delete<Role>(r => r.Id == id);
                
                return Ok(new {success = true});
            });
        }
    }
}