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

        [BsonElement("username")]
        public string Username { get; set; }

        [BsonElement("password")]
        public string Password { get; set; }

        [BsonElement("is_active")]
        public bool IsActive { get; } = true;
        
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("scopes")]
        public string[] Scopes { get; set; }
        
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("role_id")]
        public string RoleId { get; set; }
    }
}