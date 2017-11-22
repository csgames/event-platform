// route Send un confirm email
// route validate 

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PolyHxDotNetServices.Mail;
using PolyHxDotNetServices.Mail.Inputs;
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

        [HttpGet("{uuid}")]
        public Task<IActionResult> IsValidUuid(string uuid)
        {
            return Task.Run<IActionResult>(() =>
            {
                var confirmEmail = _db.Single<ConfirmEmail>(r => r.Uuid == uuid);

                if (confirmEmail == null)
                    return BadRequest();

                if (confirmEmail.Used)
                    return BadRequest();
                
                return Ok(new {});
            });
        }
        
        [HttpPut("{uuid}")]
        public Task<IActionResult> ConfirmEmail(string uuid)
        {
            return Task.Run<IActionResult>(() =>
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                var confirmEmail = _db.Where<ConfirmEmail>(r => r.Uuid == uuid).First();

                if (confirmEmail == null)
                    return BadRequest();

                if (confirmEmail.Used)
                    return BadRequest();

                _db.Update<ConfirmEmail>(confirmEmail.Id, new Dictionary<string, object>
                {
                    { "Used", true }
                });

                return Ok(new {});
            });
        }
    }
}