using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SecureTokenService.Controllers
{
    [Route("api")]
    public class RootController : Controller
    {
        // GET /api
        [HttpGet]
        public string Get()
        {
            return "STS v1.0";
        }
    }
}