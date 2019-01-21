using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace STS.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Username { get; set; }

        [JsonIgnore]
        public string Password { get; set; }

        [BsonDefaultValue(true)] 
        public bool IsActive { get; set; }

        public bool Validated { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string[] Scopes { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string RoleId { get; set; }

        public string Role { get; set; }
        
        public IEnumerable<string> Permissions { get; set; }
    }
}