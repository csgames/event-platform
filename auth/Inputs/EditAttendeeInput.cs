using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using STS.Models;

namespace STS.Inputs
{
    public class EditAttendeeInput
    {
        public string Username { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string BirthDate { get; set; }
    }
}