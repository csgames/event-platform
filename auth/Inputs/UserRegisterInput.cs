using System.ComponentModel.DataAnnotations;

namespace STS.Inputs
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
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string BirthDate { get; set; }
    }

    public class UserGetAllWithIdsInput
    {
        [Required]
        public string[] userIds { get; set; }
        [Required]
        public string test { get; set; }
    }
}