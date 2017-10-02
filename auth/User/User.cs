using System.Collections.Generic;
using System.Security.Claims;
using IdentityModel;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace STS.User
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public bool IsActive { get; } = true;
        
        [BsonRepresentation(BsonType.ObjectId)]
        public string[] Scopes { get; set; }
        
        [BsonRepresentation(BsonType.ObjectId)]
        public string RoleId { get; set; }
    }
}