using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using STS.Models;

namespace STS.Inputs
{
    public class EditAttendeeInput
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}