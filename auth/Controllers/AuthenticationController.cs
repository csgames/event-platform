using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Rest.TransientFaultHandling;
using SecureTokenService.Users;
using SecureTokenService.Utils;

namespace SecureTokenService.Controllers
{
    [Route("authentication")]
    public class AuthenticationController : Controller
    {
        private readonly IUserRepository _repo;

        public AuthenticationController(IUserRepository repo)
        {
            _repo = repo;
        }

        [HttpPost("register")]
        public async Task<JsonResult> Register([FromBody] UserModel input)
        {
            try
            {
                await _repo.Create(input);
                return new JsonResult(new
                {
                    Success = true,
                    Message = $"Successfully created user!"
                });
            }
            catch (Exception e)
            {
                return new JsonResult(new
                {
                    Success = true,
                    e.Message
                });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Credentials creds)
        {
            var user = await _repo.GetUserByUsername(creds.Username);
            if (!BCrypt.Net.BCrypt.Verify(creds.Password, user.Password))
            {
                return Unauthorized();
            } 
            
            
            
            return Ok(user);
        }
    }
}