using System.ComponentModel.DataAnnotations;

namespace STS.Inputs
{
    public class ResetPasswordInput
    {
        [Required]
        public string Password { get; set; }
    }
}