using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Rest.TransientFaultHandling;
using Newtonsoft.Json;
using SecureTokenService.Helpers;
using SecureTokenService.Users;
using SecureTokenService.Utils;

namespace SecureTokenService.Controllers
{
    [Route("authentication")]
    public class AuthenticationController : Controller
    {
        private readonly IUserRepository _repo;
        private readonly ITokenHelper _tokenHelper;

        public AuthenticationController(IUserRepository repo, ITokenHelper tokenHelper)
        {
            _repo = repo;
            _tokenHelper = tokenHelper;
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
            try
            {
                var user = await _repo.GetUserByUsername(creds.Username);
                if (!BCrypt.Net.BCrypt.Verify(creds.Password, user.Password))
                {
                    return Unauthorized();
                }

                var jwt = _tokenHelper.GenerateJWT(user);
                var refreshToken = _tokenHelper.GenerateRefreshToken(user);

                var options = new CookieOptions
                {
                    Secure = true
                };
                HttpContext.Response.Cookies.Append("refreshtoken", refreshToken, options);
                
                return Ok(new
                {
                    success = true,
                    jwt
                });
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }
    }
}