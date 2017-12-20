using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace STS.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string BirthDate { get; set; }

        public bool IsActive { get; } = true;

        public bool Validated { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string[] Scopes { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string RoleId { get; set; }

        public string Role { get; set; }
        
        public IEnumerable<string> Permissions { get; set; }
    }
}