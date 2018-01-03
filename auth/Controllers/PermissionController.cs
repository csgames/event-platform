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
    [Route("permission")]
    public class PermissionController : Controller
    {
        private readonly IRepository _db;

        public PermissionController(IRepository db)
        {
            _db = db;
        }

        [Authorize]
        [RequiresPermissions("sts:get-all:permission")]
        [HttpGet]
        public Task<IActionResult> GetAll()
        {
            return Task.Run<IActionResult>(() =>
            {
                var permissions = _db.All<Permission>();
                return Ok(new
                {
                    success = true,
                    permissions
                });
            });
        }

        [Authorize]
        [RequiresPermissions("sts:create:permission")]
        [HttpPost]
        public Task<IActionResult> Create(Permission input)
        {
            return Task.Run<IActionResult>(() =>
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                var permissionNameExists = _db.Where<Permission>(p => p.Name == input.Name).Any();

                if (permissionNameExists)
                {
                    return new StatusCodeResult((int) HttpStatusCode.Conflict);
                }

                var permission = new Permission()
                {
                    Name = input.Name
                };

                _db.Add(permission);

                return Ok(new {success = true});
            });
        }

        [Authorize]
        [RequiresPermissions("sts:update:permission")]
        [HttpPut("{id}")]
        public Task<IActionResult> Update(string id, Permission input)
        {
            return Task.Run<IActionResult>(() =>
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                var permissionExists = _db.Single<Permission>(p => p.Id == id) != null;

                if (permissionExists)
                {
                    return new StatusCodeResult((int) HttpStatusCode.NotFound);
                }

                var permission = new Permission()
                {
                    Id = id,
                    Name = input.Name
                };
                
                _db.Replace(p => p.Id == id, permission);

                return Ok(new {success = true});
            });
        }
        
        [Authorize]
        [RequiresPermissions("sts:delete:permission")]
        [HttpDelete("{id}")]
        public Task<IActionResult> Delete(string id)
        {
            return Task.Run<IActionResult>(() =>
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }
                
                _db.Delete<Permission>(p => p.Id == id);
                
                return Ok(new {success = true});
            });
        }
    }
}