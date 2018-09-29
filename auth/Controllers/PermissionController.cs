using System;
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
        [RequiresPermissions("sts:get-all:permission")]
        [HttpGet("count")]
        public Task<IActionResult> Count()
        {
            return Task.Run<IActionResult>(() =>
            {
                var count = _db.All<Permission>()
                    .ToList()
                    .Count;
                return Ok(new
                {
                    success = true,
                    count
                });
            });
        }

        [Authorize]
        [RequiresPermissions("sts:create:permission")]
        [HttpPost]
        public Task<IActionResult> Create([FromBody] Permission input)
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
        [RequiresPermissions("sts:create:permission")]
        [HttpPost("crud")]
        public Task<IActionResult> CreateCrud([FromBody] CrudInput input)
        {
            return Task.Run<IActionResult>(() =>
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                var newPermissions = new[]
                {
                    "create",
                    "get",
                    "get-all",
                    "update",
                    "delete"
                }.Select(x => $"{input.Service}:{x}:{input.Resource}");

                foreach (var permission in newPermissions)
                {
                    var permissionNameExists = _db.Where<Permission>(p => p.Name == permission).Any();

                    if (permissionNameExists)
                    {
                        continue;
                    }

                    var newPermission = new Permission
                    {
                        Name = permission
                    };

                    _db.Add(newPermission);
                }

                return Ok(new {success = true});
            });
        }

        [Authorize]
        [RequiresPermissions("sts:update:permission")]
        [HttpPut("{id}")]
        public Task<IActionResult> Update(string id, [FromBody] Permission input)
        {
            return Task.Run<IActionResult>(() =>
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                var permissionExists = _db.Single<Permission>(p => p.Id == id) != null;

                if (!permissionExists)
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

                var allRoles = _db.All<Role>().ToList();
                var roles = allRoles.Where(r => r.Permissions.Contains(id));
                RemovePermissionFromRoles(id, roles);

                var clients = _db.All<Client>();
                RemovePermissionFromClients(id, clients);

                _db.Delete<Permission>(p => p.Id == id);

                return Ok(new {success = true});
            });
        }

        [Authorize]
        [RequiresPermissions("sts:delete:permission")]
        [HttpDelete("service/{name}")]
        public Task<IActionResult> DeleteService(string name)
        {
            return Task.Run<IActionResult>(() =>
            {
                var permissions = _db.Where<Permission>(x => x.Name.StartsWith($"{name}:")).ToList();
                if (permissions.Count == 0)
                {
                    return Ok(new {success = true});
                }

                DeleteAllPermissions(permissions);

                return Ok(new {success = true});
            });
        }
        
        [Authorize]
        [RequiresPermissions("sts:delete:permission")]
        [HttpDelete("resource/{name}")]
        public Task<IActionResult> DeleteResource(string name)
        {
            return Task.Run<IActionResult>(() =>
            {
                var permissions = _db.Where<Permission>(x => x.Name.EndsWith($":{name}")).ToList();
                if (permissions.Count == 0)
                {
                    return Ok(new {success = true});
                }

                DeleteAllPermissions(permissions);

                return Ok(new {success = true});
            });
        }


        private void RemovePermissionFromRoles(string id, IEnumerable<Role> roles)
        {
            foreach (var role in roles)
            {
                var permissionList = role.Permissions.ToList();
                permissionList.Remove(id);
                role.Permissions = permissionList.ToArray();
                _db.Replace(r => r.Id == role.Id, role);
            }
        }

        private void RemovePermissionFromClients(string id, IEnumerable<Client> clients)
        {
            foreach (var client in clients)
            {
                client.Properties.TryGetValue("permissions", out var permissions);
                if (permissions == null) continue;
                var deserializedPermissions = JsonConvert.DeserializeObject<List<string>>(permissions);

                if (!deserializedPermissions.Contains(id)) continue;

                deserializedPermissions.Remove(id);
                client.Properties["permissions"] = JsonConvert.SerializeObject(deserializedPermissions);
                _db.Replace(c => c.ClientId == client.ClientId, client);
            }
        }

        private void DeleteAllPermissions(IList<Permission> permissions)
        {
            var allRoles = _db.All<Role>().ToList();
            var clients = _db.All<Client>();
            foreach (var permission in permissions)
            {
                var roles = allRoles.Where(r => r.Permissions.Contains(permission.Id));
                RemovePermissionFromRoles(permission.Id, roles);
                RemovePermissionFromClients(permission.Id, clients);
            }

            var ids = permissions.Select(x => x.Id);
            _db.Delete<Permission>(p => ids.Contains(p.Id));
        }
    }
}