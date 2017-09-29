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
using ServiceStack;

namespace SecureTokenService.Controllers
{
    [Microsoft.AspNetCore.Mvc.Route("authentication")]
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
        public async Task<IActionResult> Register([FromBody] UserModel input)
        {
            try
            {
                var authorization = Request.Headers["Authorization"].ToString();
                var type = authorization.Split(" ")[0];
                var jwt = authorization.Split(" ")[1];
                try
                {
                    var token = _tokenHelper.ValidateJWT(jwt, new string[] {"regiset"});
                    if (token == null)
                    {
                        return new StatusCodeResult(401);
                    }
                }
                catch (Exception e)
                {
                    
                }
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

                
                var hasRefreshToken = Request.Cookies["refreshtoken"];
                if (hasRefreshToken == null || !_tokenHelper.IsRefreshTokenValid(hasRefreshToken))
                {
                    var refreshToken = _tokenHelper.GenerateRefreshToken(user);

                    var options = new CookieOptions
                    {
                        Expires = DateTime.Now.AddDays(1)
                    };
                    HttpContext.Response.Cookies.Append("refreshtoken", refreshToken, options);
                }
                var jwt = _tokenHelper.GenerateJWT(user);
                
                
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
        
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh()
        {
            try
            {
                var refreshToken = Request.Cookies["refreshtoken"];

                var user = await _tokenHelper.GetUserForRefreshToken(refreshToken);
                
                var jwt = _tokenHelper.GenerateJWT(user);
                
                return Ok(new
                {
                    success = true,
                    jwt
                });
            }
            catch (Exception e)
            {
                return Unauthorized();
            }
        }
    }
}