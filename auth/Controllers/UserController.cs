using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using STS.Attributes;
using PolyHxDotNetServices.Mail;
using PolyHxDotNetServices.Mail.Inputs;
using STS.Helpers;
using STS.Inputs;
using STS.Interface;
using STS.Models;
using STS.Utils;

namespace STS.Controllers
{
    [Route("user")]
    public class UserController : Controller
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

        public UserController(IRepository db, IMailService mailService)
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
                        RoleId = _db.Single<Role>(r => r.Name == "attendee").Id,
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
        [RequiresPermissions("sts:get-all:user")]
        [HttpGet]
        public Task<IActionResult> GetAll()
        {
            return Task.Run<IActionResult>(() =>
            {
                var users = _db.All<User>()
                    .ToList()
                    .Select(u =>
                    {
                        var role = _db.Single<Role>(r => r.Id == u.RoleId);
                        var permissions = _db.Where<Permission>(p => role.Permissions.Contains(p.Id))
                            .Select(p => p.Name);
                        u.Role = role.Name;
                        u.Permissions = permissions.ToList();
                        return u;
                    });
                return Ok(new
                {
                    success = true,
                    users
                });
            });
        }

        [Authorize]
        [RequiresPermissions("sts:get-all:user")]
        [HttpGet("count")]
        public Task<IActionResult> Count()
        {
            return Task.Run<IActionResult>(() =>
            {
                var count = _db.All<User>()
                    .ToList()
                    .Count;
                return Ok(new
                {
                    success = true,
                    count
                });
            });
        }

        [Authorize]
        [RequiresPermissions("sts:get-all:user")]
        [HttpPost("filter")]
        public Task<IActionResult> GetAllSortedFiltered([FromBody] FilterInput input)
        {
            return Task.Run<IActionResult>(() =>
            {
                var roles = _db.All<Role>();
                var count = _db.All<User>()
                    .ToList()
                    .Count;
                var data = _db.All<User>()
                    .Skip(input.Size * (input.Start - 1))
                    .Take(input.Size)
                    .ToArray()
                    .Select(x => new FilteredUser
                    {
                        Id = x.Id,
                        Role = roles.Single(y => y.Id == x.RoleId).Name,
                        Username = x.Username,
                        Active = x.IsActive,
                        Validated = x.Validated
                    })
                    .ToArray();
                return Ok(new
                {
                    success = true,
                    result = new FilteredData<FilteredUser>
                    {
                        Total = count,
                        Data = data
                    }
                });
            });
        }

        [Authorize]
        [RequiresPermissions("sts:get-all:user")]
        [HttpPost("query")]
        public Task<IActionResult> QueryAll(UserQueryAllInput input)
        {
            return Task.Run<IActionResult>(() =>
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                var users = _db.All<User>().AsEnumerable();

                users = users.Where(u =>
                    u.Username?.Contains(input.searchValue) == true);

                return Json(new
                {
                    users
                });
            });
        }

        [Authorize]
        [RequiresPermissions("sts:create:user")]
        [HttpPost]
        public Task<IActionResult> Post([FromBody] UserRegisterInput input)
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
                        IsActive = input?.IsActive ?? false,
                        Validated = input?.Validated ?? false
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

                var role = _db.Single<Role>(r => r.Id == user.RoleId);
                var permissions = _db.Where<Permission>(p => role.Permissions.Contains(p.Id))
                    .Select(p => p.Name);
                user.Role = role.Name;
                user.Permissions = permissions.ToList();

                return Ok(new
                {
                    success = true,
                    user
                });
            });
        }

        [Authorize]
        [RequiresPermissions("sts:get:user")]
        [HttpGet("username/{username}")]
        public Task<IActionResult> GetByUsername(string username)
        {
            return Task.Run<IActionResult>(() =>
            {
                var user = _db.Single<User>(u => u.Username == username);
                if (user == null)
                {
                    return NotFound();
                }

                var role = _db.Single<Role>(r => r.Id == user.RoleId);
                var permissions = _db.Where<Permission>(p => role.Permissions.Contains(p.Id))
                    .Select(p => p.Name);
                user.Role = role.Name;
                user.Permissions = permissions.ToList();

                return Ok(new
                {
                    success = true,
                    user
                });
            });
        }

        [Authorize]
        [RequiresPermissions("sts:get-all-with-ids:user")]
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
        public Task<IActionResult> UpdateAttendee(string id, EditAttendeeInput input)
        {
            return Task.Run<IActionResult>(() =>
            {
                // Check if the authenticated user matches the edited user.
                var authenticatedUserId = from c in HttpContext.User.Claims
                    where c.Type == "user_id"
                    select c.Value;

                if (authenticatedUserId.First() != id)
                {
                    return new ForbidResult();
                }

                // Check if user exist.
                var user = _db.Single<User>(u => u.Id == id);

                if (user == null)
                {
                    return new StatusCodeResult((int) HttpStatusCode.BadRequest);
                }


                // If the username changes, check if the new one is not taken.
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
                    var dic = input.ToDictionary();
                    dic["OldPassword"] = null;
                    dic["NewPassword"] = null;

                    // If changing the password.
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
                    return new StatusCodeResult((int) HttpStatusCode.InternalServerError);
                }
            });
        }

        [Authorize]
        [RequiresPermissions("sts:update-admin:user")]
        [HttpPut("admin/{id}")]
        public Task<IActionResult> Update(string id, [FromBody] EditUserInput input)
        {
            return Task.Run<IActionResult>(() =>
            {
                // Check if user exist.
                var user = _db.Single<User>(u => u.Id == id);

                if (user == null)
                {
                    return new StatusCodeResult((int) HttpStatusCode.BadRequest);
                }


                // If the username changes, check if the new one is not taken.
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
                    var dic = input.ToDictionary();

                    // If changing the password.
                    if (input.Password != null)
                    {
                        if (!ValidatePassword(input.Password))
                        {
                            return BadRequest(new
                            {
                                Message = "Password not valid"
                            });
                        }

                        dic["Password"] = BCrypt.Net.BCrypt.HashPassword(input.Password);
                    }

                    _db.Update<User>(user.Id, dic);

                    return Ok(new
                    {
                        success = true
                    });
                }
                catch (Exception)
                {
                    return new StatusCodeResult((int) HttpStatusCode.InternalServerError);
                }
            });
        }
    }
}