using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SecureTokenService.Models
{
    public class UserModel : ModelBase
    {
        [BsonElement("username")]
        public string Username { get; set; }
        [BsonElement("password")]
        public string Password { get; set; }
    }
}