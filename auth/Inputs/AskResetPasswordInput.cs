using System.ComponentModel.DataAnnotations;

namespace STS.Inputs
{
    public class AskResetPasswordInput
    {
        [Required]
        public string Username { get; set; }
    }
}