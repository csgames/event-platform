using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SecureTokenService.Interfaces;
using SecureTokenService.Models;

namespace SecureTokenService.Controllers
{
    [Route("api")]
    public class RootController : Controller
    {
        private IUserRepository _repo;

        public RootController(IUserRepository repo)
        {
            _repo = repo;
        }

        // GET /api
        [HttpGet]
        public async Task<JsonResult> Get()
        {
            var test = await _repo.GetAll();
            return new JsonResult(new
            {
                tst = test.ToArray()
            });
        }
    }
}