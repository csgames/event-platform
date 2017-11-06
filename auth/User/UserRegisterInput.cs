using System.ComponentModel.DataAnnotations;

namespace STS.User
{
    public class UserRegisterInput
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string RoleId { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string BirthDate { get; set; }
    }
}