using Microsoft.AspNetCore.Mvc;

namespace STS.Controllers
{
    [Route("")]
    public class RootController : Controller
    {
        public JsonResult Index()
        {
            return new JsonResult(new
            {
                name = "Security Token Service",
                version = "1.0.0"
            });
        }
    }
}