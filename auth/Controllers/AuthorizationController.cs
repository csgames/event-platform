using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures.Internal;
using SecureTokenService.Utils;

namespace SecureTokenService.Controllers
{
    [Route("authorize")]
    public class AuthorizationController : Controller
    {
        [HttpPost]
        public Task<AuthorizationResult> AuthorizeRequest()
        {
            return Task.Run(() => new AuthorizationResult
            {
                Success = true,
                Message = "Test"
            });
        }
    }
}