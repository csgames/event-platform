using System.ComponentModel.DataAnnotations;

namespace STS.Inputs
{
    public class CrudInput
    {
        [Required]
        public string Service;

        [Required]
        public string Resource;
    }
}