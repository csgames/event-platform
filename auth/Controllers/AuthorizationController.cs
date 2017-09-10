using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures.Internal;
using SecureTokenService.Utils;

namespace SecureTokenService.Controllers
{
    [Route("authorization")]
    public class AuthorizationController : Controller
    {
        [HttpPost]
        public Task<JsonResult> AuthorizeRequest()
        {
            return Task.Run(() => new JsonResult(new
            {
                Success = true,
                Message = "Test"
            }));
        }
    }
}