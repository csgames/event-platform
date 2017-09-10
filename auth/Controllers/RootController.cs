using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using SecureTokenService.Roles;
using SecureTokenService.Users;

namespace SecureTokenService.Controllers
{
    [Route("api")]
    public class RootController : Controller
    {
        private readonly IRoleRepository _repo;

        public RootController(IRoleRepository repo)
        {
            _repo = repo;
        }

        // GET /api
        [HttpGet]
        public async Task<JsonResult> Get()
        {
            try
            {
                var test = await _repo.GetById(new ObjectId("59b4a2f6df8c08b46003a4fd"));
                return new JsonResult(new
                {
                    tst = test
                });
            }
            catch (Exception e)
            {
                Response.StatusCode = 500;
                return new JsonResult(new
                {
                    tst = e
                });
            }
        }
    }
}