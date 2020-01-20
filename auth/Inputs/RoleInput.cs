using System.ComponentModel.DataAnnotations;

namespace STS.Inputs
{
    public class RoleInput
    {
        [Required]        
        public string Name { get; set; }
        
        [Required]
        public string[] Permissions { get; set; }
    }
}