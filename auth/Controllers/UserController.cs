using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using STS.Attributes;
using STS.Inputs;
using STS.Interface;
using STS.Models;

namespace STS.Controllers
{
    [Route("user")]
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
        public Task<IActionResult> CreateAttendee(AttendeeRegisterInput input)
        {
            return Task.Run<IActionResult>(() =>
            {
                if (!ModelState.IsValid)
                {
                    Console.WriteLine(input);
                    return BadRequest();
                }
                var user = _db.Single<User>(u => u.Username == input.Username);
                if (user != null)
                {
                    return new StatusCodeResult((int) HttpStatusCode.Conflict);
                }
                try
                {
                    var hashedPassword = BCrypt.Net.BCrypt.HashPassword(input.Password);
                    user = new User
                    {
                        Username = input.Username,
                        Password = hashedPassword,
                        BirthDate = input.BirthDate,
                        RoleId = _db.Single<Role>(r => r.Name == "attendee").Id,
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
                    return new StatusCodeResult((int) HttpStatusCode.InternalServerError);
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
                var user = _db.Single<User>(u => u.Username == input.Username);
                if (user != null)
                {
                    return new StatusCodeResult((int) HttpStatusCode.Conflict);
                }
                try
                {
                    var hashedPassword = BCrypt.Net.BCrypt.HashPassword(input.Password);
                    user = new User
                    {
                        Username = input.Username,
                        Password = hashedPassword,
                        RoleId = input.RoleId,
                        BirthDate = input.BirthDate,
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
                    return new StatusCodeResult((int) HttpStatusCode.InternalServerError);
                }
            });
        }

        [Authorize]
        [RequiresPermissions("sts:get:user")]
        [HttpGet("{id}")]
        public Task<IActionResult> Get(string id)
        {
            return Task.Run<IActionResult>(() =>
            {
                var user = _db.Single<User>(u => u.Id == id);
                if (user == null)
                {
                    return NotFound();
                } 
                return Ok(new
                {
                    success = true,
                    user
                });
            });
        }

        [Authorize]
        [RequiresPermissions("sts:update:user")]
        [HttpPut("{id}")]
        public Task<IActionResult> UpdateUser(string id, ChangeUserInput input)
        {
            return Task.Run<IActionResult>(() =>
            {
                var user = _db.Single<User>(u => u.Id == id);
                if (user == null)
                {
                    return new StatusCodeResult((int)HttpStatusCode.BadRequest);
                }
                try
                {
                    var dic = input.toDictionnary();
                    if (input.NewPassword != null)
                    {
                        if (!BCrypt.Net.BCrypt.Verify(input.OldPassword, user.Password))
                        {
                            return StatusCode((int) HttpStatusCode.BadRequest, new
                            {
                                success = true,
                                code = ErrorCode.WrongOldPasswordError
                            });
                        }
                        dic["Password"] = BCrypt.Net.BCrypt.HashPassword(input.NewPassword);
                    }
                   
                    _db.Update<User>(user.Id, dic);  
   
                    return Ok(new
                    {
                        success = true,
                        user = _db.Single<User>(u => u.Id == id)
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