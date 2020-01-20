namespace STS.Models
{
    public class FilteredClient
    {
        public string ClientName { get; set; }
        public string ClientId { get; set; }
        public string AllowedGrantTypes { get; set; }
        public string AllowedScopes { get; set; }
        public int Permissions { get; set; }
        public bool AllowOfflineAccess { get; set; }
    }
}