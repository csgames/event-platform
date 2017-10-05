using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.OData.Query;
using MongoDB.Bson;
using Newtonsoft.Json;
using STS.Interface;
using STS.User;

namespace STS.Controllers
{
    
    [Route("register")]
    public class RegisterController : Controller
    {
        enum ErrorCode
        {
            WRONG_OLD_PASSWORD_ERROR = 26
        }
        
        private readonly IRepository _db;

        public RegisterController(IRepository db)
        {
            _db = db;
        }

        [Authorize]
        [HttpPost]
        public Task<IActionResult> Post(UserRegisterInput input)
        {
            return Task.Run<IActionResult>(() =>
            {
                var permissionsClaim =
                (from c in HttpContext.User.Claims
                    where c.Type == "permissions" || c.Type == "client_permissions"
                    select c).First();

                if (permissionsClaim == null)
                {
                    return Forbid();
                }

                var permissions = JsonConvert.DeserializeObject<List<string>>(permissionsClaim.Value);

                if (!permissions.Contains("sts:create:user"))
                {
                    return Forbid();
                }

                if (!ModelState.IsValid)
                {
                    Console.WriteLine(input);
                    return BadRequest();
                }
                var user = _db.Single<User.User>(u => u.Username == input.Username);
                if (user != null)
                {
                    return new StatusCodeResult((int) HttpStatusCode.Conflict);
                }
                try
                {
                    var hashedPassword = BCrypt.Net.BCrypt.HashPassword(input.Password);
                    _db.Add(new User.User()
                    {
                        Username = input.Username,
                        Password = hashedPassword,
                        RoleId = input.RoleId
                    });
                    return Ok(new
                    {
                        success = true,
                    });
                }
                catch (Exception e)
                {
                    return new StatusCodeResult((int) HttpStatusCode.InternalServerError);
                }
            });
        }

        [Authorize]
        [HttpPut("password")]
        public Task<IActionResult> ChangePassword(ChangePasswordInput input)
        {
            return Task.Run<IActionResult>(() =>
            {
                var permissionsClaim =
                (from c in HttpContext.User.Claims
                    where c.Type == "permissions" || c.Type == "client_permissions"
                    select c).First();

                if (permissionsClaim == null)
                {
                    return Forbid();
                }

                var permissions = JsonConvert.DeserializeObject<List<string>>(permissionsClaim.Value);

                if (!permissions.Contains("sts:update:password"))
                {
                    return Forbid();
                }
                
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }
                
                var user = _db.Single<User.User>(u => u.Username == input.Username);
                if (user == null)
                {
                    return new StatusCodeResult((int) HttpStatusCode.BadRequest);
                }
                try
                {
                    if (!BCrypt.Net.BCrypt.Verify(input.OldPassword, user.Password))
                    {
                        return StatusCode((int) HttpStatusCode.BadRequest, new
                        {
                            success = true,
                            code = ErrorCode.WRONG_OLD_PASSWORD_ERROR
                        });
                    }
                    var hashedNewPassword = BCrypt.Net.BCrypt.HashPassword(input.NewPassword);
                    _db.Update<User.User>(user.Id, new Dictionary<string, object>()
                    {
                        {"Password", hashedNewPassword}
                    });
                    return Ok(new
                    {
                        success = true,
                    });
                }
                catch (Exception e)
                {
                    return new StatusCodeResult((int) HttpStatusCode.InternalServerError);
                }
            });
        }
    }
}