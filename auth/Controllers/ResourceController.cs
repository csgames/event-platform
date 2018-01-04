using System.Linq;
using System.Net;
using System.Threading.Tasks;
using IdentityServer4.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using STS.Attributes;
using STS.Inputs;
using STS.Interface;
using STS.Models;

namespace STS.Controllers
{
    [Route("resource")]
    public class ResourceController : Controller
    {
        private readonly IRepository _db;

        public ResourceController(IRepository db)
        {
            _db = db;
        }


        [Authorize]
        [RequiresPermissions("sts:get-all:resource")]
        [HttpGet]
        public Task<IActionResult> GetAll()
        {
            return Task.Run<IActionResult>(() =>
            {
                var resources = _db.All<ApiResource>()
                    .Select(r => new ApiResourceModel {Name = r.Name, DisplayName = r.DisplayName});

                return Ok(new
                {
                    success = true,
                    resources
                });
            });
        }


        [Authorize]
        [RequiresPermissions("sts:get-all:resource")]
        [HttpGet("count")]
        public Task<IActionResult> Count()
        {
            return Task.Run<IActionResult>(() =>
            {
                var count = _db.All<ApiResource>()
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
        [RequiresPermissions("sts:get:resource")]
        [HttpGet("{name}")]
        public Task<IActionResult> Get(string name)
        {
            return Task.Run<IActionResult>(() =>
            {
                var completeResource = _db.Single<ApiResource>(r => r.Name == name);
                var resource = new ApiResourceModel
                {
                    Name = completeResource.Name,
                    DisplayName = completeResource.DisplayName
                };
                return Ok(new
                {
                    success = true,
                    resource
                });
            });
        }


        [Authorize]
        [RequiresPermissions("sts:create:resource")]
        [HttpPost]
        public Task<IActionResult> Create(ApiResourceModel input)
        {
            return Task.Run<IActionResult>(() =>
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                var resourceExist = _db.Where<ApiResource>(r => r.Name == input.Name).Any();

                if (resourceExist)
                {
                    return new StatusCodeResult((int) HttpStatusCode.Conflict);
                }

                var resource = new ApiResource(input.Name, input.DisplayName);

                _db.Add(resource);

                return Ok(new {success = true});
            });
        }

        [Authorize]
        [RequiresPermissions("sts:update:resource")]
        [HttpPut("{name}")]
        public Task<IActionResult> Update(string name, ApiResourceModel input)
        {
            return Task.Run<IActionResult>(() =>
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                var resourceExists = _db.Single<ApiResource>(r => r.Name == name) != null;

                if (!resourceExists)
                {
                    return new StatusCodeResult((int) HttpStatusCode.NotFound);
                }

                var resource = new ApiResource(input.Name, input.DisplayName);
                _db.Replace(r => r.Name == name, resource);

                return Ok(new {success = true});
            });
        }
        
        [Authorize]
        [RequiresPermissions("sts:delete:resource")]
        [HttpDelete("{name}")]
        public Task<IActionResult> Delete(string name)
        {
            return Task.Run<IActionResult>(() =>
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                _db.Delete<ApiResource>(r => r.Name == name);

                return Ok(new {success = true});
            });
        }
    }
}