using System.ComponentModel.DataAnnotations;

namespace STS.User
{
    public class UserRegisterInput
    {
        [Required]
        public string Username;
        [Required]
        public string Password;
        [Required]
        public string RoleId;
    }
}