namespace STS.Models
{
    public class FilteredUser
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
        public bool Active { get; set; }
        public bool Validated { get; set; }
    }
}