using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using SecureTokenService.Models;

namespace SecureTokenService.Users
{
    public class UserModel : ModelBase
    {
        [BsonElement("username")]
        public string Username { get; set; }
        [BsonElement("password")]
        public string Password { get; set; }
    }
}