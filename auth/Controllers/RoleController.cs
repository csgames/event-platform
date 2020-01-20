using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
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
        [RequiresPermissions("sts:get-all:role")]
        [HttpGet("count")]
        public Task<IActionResult> Count()
        {
            return Task.Run<IActionResult>(() =>
            {
                var count = _db.All<Role>()
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
        [RequiresPermissions("sts:get-all:role")]
        [HttpGet("name/{name}")]
        public Task<IActionResult> GetByName(string name)
        {
            return Task.Run<IActionResult>(() =>
            {
                var role = _db.Single<Role>(r => r.Name == name);
                var ids = new BsonArray(role.Permissions.Select(x => new ObjectId(x)));
                var permissions = _db.Find<Permission>(new BsonDocument("_id", new BsonDocument("$in", ids))).ToList().Select(x => x.Name).ToArray();
                return Ok(new
                {
                    success = true,
                    role = new
                    {
                        role.Id,
                        role.Name,
                        Permissions = permissions
                    }
                });
            });
        }
        
        
        [Authorize]
        [RequiresPermissions("sts:create:role")]
        [HttpPost]
        public Task<IActionResult> Create([FromBody] RoleInput input)
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
        public Task<IActionResult> Update(string id, [FromBody] RoleInput input)
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

        [Authorize]
        [RequiresPermissions("sts:get-all:role")]
        [HttpPost("filter")]
        public Task<IActionResult> Filter([FromBody] FilterInput input)
        {
            return Task.Run<IActionResult>(() =>
            {
                var count = _db.All<Role>()
                    .ToList()
                    .Count;
                var data = _db.All<Role>()
                    .Skip(input.Size * (input.Start - 1))
                    .Take(input.Size)
                    .Select(x => new FilteredRole
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Permissions = x.Permissions.Length
                    })
                    .ToArray();
                return Ok(new
                {
                    success = true,
                    result = new FilteredData<FilteredRole>
                    {
                        Total = count,
                        Data = data
                    }
                });
            });
        }
    }
}