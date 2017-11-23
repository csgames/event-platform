// route Send un confirm email
// route validate 

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PolyHxDotNetServices.Mail;
using PolyHxDotNetServices.Mail.Inputs;
using STS.Attributes;
using STS.Inputs;
using STS.Interface;
using STS.Models;

namespace STS.Controllers
{
    [Route("confirmEmail")]
    public class ConfirmEmailController : Controller
    {
        private readonly IRepository _db;
        private readonly IMailService _mailService;

        public ConfirmEmailController(IRepository db, IMailService mailService)
        {
            _db = db;
            _mailService = mailService;
        }

        [Authorize]
        [RequiresPermissions("sts:send:confirm-email")]
        [HttpPost("send")]
        public Task<IActionResult> SendConfirmEmail(AskResetPasswordInput input)
        {
            return Task.Run<IActionResult>(async () =>
            {
                var user = _db.Single<User>(c => c.Username == input.Username);

                if (user == null)
                {
                    return new StatusCodeResult((int) HttpStatusCode.BadRequest);
                }

                var confirmEmail = _db.Single<ConfirmEmail>(r => r.UserId == user.Id && !r.Used);

                if (confirmEmail == null)
                    return BadRequest();

                confirmEmail.Uuid = Guid.NewGuid().ToString();
                _db.Update<ResetPassword>(confirmEmail.Id, new Dictionary<string, object>
                {
                    {"Uuid", confirmEmail.Uuid}
                });
                
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
                await _mailService.SendEmail(mailInput);

                return Ok(new {});
            });
        }

        [HttpPut("{uuid}")]
        public Task<IActionResult> ConfirmEmail(string uuid)
        {
            return Task.Run<IActionResult>(() =>
            {
                var confirmEmail = _db.Single<ConfirmEmail>(r => r.Uuid == uuid && !r.Used);

                if (confirmEmail == null)
                    return BadRequest();

                var user = _db.Single<User>(u => u.Id == confirmEmail.UserId);

                if (user == null)
                    return BadRequest();

                _db.Update<User>(user.Id, new Dictionary<string, object>
                {
                    { "Validated", true }
                });

                _db.Update<ConfirmEmail>(confirmEmail.Id, new Dictionary<string, object>
                {
                    { "Used", true }
                });

                return Ok(new {});
            });
        }
    }
}