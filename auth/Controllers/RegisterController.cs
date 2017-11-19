using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using STS.Attributes;
using STS.Interface;
using STS.User;

namespace STS.Controllers
{

    [Route("register")]
    public class RegisterController : Controller
    {
        private enum ErrorCode
        {
            WrongOldPasswordError = 26
        }

        private readonly IRepository _db;

        public RegisterController(IRepository db)
        {
            _db = db;
        }

        [HttpPost("attendee")]
        public Task<IActionResult> createAttendee(AttendeeRegisterInput input)
        {
            return Task.Run<IActionResult>(() =>
            {
                if (!ModelState.IsValid)
                {
                    Console.WriteLine(input);
                    return BadRequest();
                }
                var user = _db.Single<User.User>(u => u.Username == input.Username);
                if (user != null)
                {
                    return new StatusCodeResult((int)HttpStatusCode.Conflict);
                }
                try
                {
                    var hashedPassword = BCrypt.Net.BCrypt.HashPassword(input.Password);
                    user = new User.User()
                    {
                        Username = input.Username,
                        Password = hashedPassword,
                        BirthDate = input.BirthDate,
                        RoleId = _db.Single<User.Role>(r => r.Name == "attendee").Id,
                        Email = input.Email,
                        FirstName = input.FirstName,
                        LastName = input.LastName
                    };
                    _db.Add(user);
                    return Ok(new
                    {
                        success = true,
                        userId = user.Id
                    });
                }
                catch (Exception)
                {
                    return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
                }
            });
        }

        [Authorize]
        [RequiresPermissions("sts:create:user")]
        [HttpPost]
        public Task<IActionResult> Post(UserRegisterInput input)
        {
            return Task.Run<IActionResult>(() =>
            {
                if (!ModelState.IsValid)
                {
                    Console.WriteLine(input);
                    return BadRequest();
                }
                var user = _db.Single<User.User>(u => u.Username == input.Username);
                if (user != null)
                {
                    return new StatusCodeResult((int)HttpStatusCode.Conflict);
                }
                try
                {
                    var hashedPassword = BCrypt.Net.BCrypt.HashPassword(input.Password);
                    user = new User.User()
                    {
                        Username = input.Username,
                        Password = hashedPassword,
                        RoleId = input.RoleId,
                        BirthDate = input.BirthDate,
                        Email = input.Email,
                        FirstName = input.FirstName,
                        LastName = input.LastName
                    };
                    _db.Add(user);
                    return Ok(new
                    {
                        success = true,
                        userId = user.Id
                    });
                }
                catch (Exception)
                {
                    return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
                }
            });
        }

        [Authorize]
        [RequiresPermissions("sts:update:password")]
        [HttpPut("password")]
        public Task<IActionResult> ChangePassword(ChangePasswordInput input)
        {
            return Task.Run<IActionResult>(() =>
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                var user = _db.Single<User.User>(u => u.Username == input.Username);
                if (user == null)
                {
                    return new StatusCodeResult((int)HttpStatusCode.BadRequest);
                }
                try
                {
                    if (!BCrypt.Net.BCrypt.Verify(input.OldPassword, user.Password))
                    {
                        return StatusCode((int)HttpStatusCode.BadRequest, new
                        {
                            success = true,
                            code = ErrorCode.WrongOldPasswordError
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
                catch (Exception)
                {
                    return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
                }
            });
        }
    }
}