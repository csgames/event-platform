using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using STS.Attributes;
using PolyHxDotNetServices.Mail;
using PolyHxDotNetServices.Mail.Inputs;
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
        private readonly IMailService _mailService;

        public static bool ValidatePassword(string password)
        {
            var pattern = @"[0-9]";
            var matches = Regex.Matches(password, pattern);
            if (matches.Count == 0)
                return false;

            pattern = @"[A-Z]";
            matches = Regex.Matches(password, pattern);
            if (matches.Count == 0)
                return false;

            pattern = @"[a-z]";
            matches = Regex.Matches(password, pattern);
            if (matches.Count == 0)
                return false;
            
            return password.Length >= 8;
        }
        
        public RegisterController(IRepository db, IMailService mailService)
        {
            _db = db;
            _mailService = mailService;
        }

        [HttpPost("attendee")]
        public Task<IActionResult> CreateAttendee(AttendeeRegisterInput input)
        {
            return Task.Run<IActionResult>(async () =>
            {
                if (!ModelState.IsValid)
                {
                    Console.WriteLine(input);
                    return BadRequest();
                }

                if (!ValidatePassword(input.Password))
                {
                    return BadRequest(new
                    {
                        Message = "Password not valid"
                    });
                }

                var user = _db.Single<User>(u => u.Username == input.Username.ToLower());
                if (user != null)
                {
                    return new StatusCodeResult((int) HttpStatusCode.Conflict);
                }
                try
                {
                    var hashedPassword = BCrypt.Net.BCrypt.HashPassword(input.Password);
                    user = new User
                    {
                        Username = input.Username.ToLower(),
                        Password = hashedPassword,
                        BirthDate = input.BirthDate,
                        RoleId = _db.Single<Role>(r => r.Name == "attendee").Id,
                        FirstName = input.FirstName,
                        LastName = input.LastName,
                        Validated = false
                    };
                    _db.Add(user);

                    var confirmEmail = new ConfirmEmail
                    {
                        UserId = user.Id,
                        Uuid = Guid.NewGuid().ToString()
                    };
                    _db.Add(confirmEmail);

                    //  Create confirm password doc
                    var mailInput = new SendMailInput
                    {
                        From = "PolyHx <support@polyhx.io>",
                        To = new[] {user.Username},
                        Subject = "Confirmer votre compte | Confirm your account",
                        Template = "confirm_email",
                        Html = "<html></html>",
                        Text = "Text",
                        Variables = new Dictionary<string, string>
                        {
                            {"name", $"{user.FirstName}"},
                            {"url", $"{Environment.GetEnvironmentVariable("CONFIRM_EMAIL_URL")}/{confirmEmail.Uuid}"}
                        }
                    };
                    var res = await _mailService.SendEmail(mailInput);

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
                var user = _db.Single<User>(u => u.Username == input.Username.ToLower());
                if (user != null)
                {
                    return new StatusCodeResult((int) HttpStatusCode.Conflict);
                }
                
                if (!ValidatePassword(input.Password))
                {
                    return BadRequest(new
                    {
                        Message = "Password not valid"
                    });
                }
                
                try
                {
                    var hashedPassword = BCrypt.Net.BCrypt.HashPassword(input.Password);
                    user = new User
                    {
                        Username = input.Username.ToLower(),
                        Password = hashedPassword,
                        RoleId = input.RoleId,
                        BirthDate = input.BirthDate,
                        FirstName = input.FirstName,
                        LastName = input.LastName,
                        Validated = false
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
        [RequiresPermissions("sts:get:users-with-ids")]
        [HttpPost("getallwithids")]
        public Task<IActionResult> GetAllWithIds(UserGetAllWithIdsInput input)
        {
            return Task.Run<IActionResult>(() =>
            {
                var users = _db.Where<User>(u => input.userIds.Contains(u.Id));
                if (users == null)
                {
                    return NotFound();
                }
                return Ok(new
                {
                    users
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

                input.Username = input.Username.ToLower();
                if (input.Username != null && input.Username != user.Username)
                {
                    var u = _db.Single<User>(U => U.Username == input.Username);
                    if (u != null)
                    {
                        return new StatusCodeResult((int) HttpStatusCode.Conflict);
                    }
                }
                
                try
                {
                    var dic = input.toDictionnary();
                    if (input.NewPassword != null)
                    {
                        if (!ValidatePassword(input.NewPassword))
                        {
                            return BadRequest(new
                            {
                                Message = "Password not valid"
                            });
                        }
                        
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
                        success = true
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