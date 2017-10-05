using System.ComponentModel.DataAnnotations;

namespace STS.User
{
    public class ChangePasswordInput
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string OldPassword { get; set; }

        [Required]
        public string NewPassword { get; set; }
    }
}