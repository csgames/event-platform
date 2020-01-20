using System.ComponentModel.DataAnnotations;

namespace STS.Inputs
{
    public class SendConfirmEmailInput
    {
        [Required]
        public string Username { get; set; }
    }
}