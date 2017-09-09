using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using SecureTokenService.Users;

namespace SecureTokenService.Controllers
{
    [Route("api")]
    public class RootController : Controller
    {
        private readonly IUserRepository _repo;

        public RootController(IUserRepository repo)
        {
            _repo = repo;
        }

        // GET /api
        [HttpGet]
        public async Task<JsonResult> Get()
        {
            try
            {
                var test = await _repo.GetById(new ObjectId("59b44d402685179338978500"));
                return new JsonResult(new
                {
                    tst = test
                });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}