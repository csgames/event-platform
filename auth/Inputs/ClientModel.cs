using System.ComponentModel.DataAnnotations;

namespace STS.Inputs
{
    public class ClientModel
    {
        [Required]
        public string ClientId { get; set; }
        
        [Required]
        public string ClientName { get; set; }
        
        [Required]
        public string ClientSecret { get; set; }
        
        [Required]
        public string[] AllowedGrantTypes { get; set; }
        
        [Required]
        public string[] AllowedScopes { get; set; }
        
        [Required]
        public bool AllowOfflineAccess { get; set; }
        
        [Required]
        public string[] Permissions { get; set; }
    }
}