using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using SecureTokenService.Models;
using SecureTokenService.Roles;

namespace SecureTokenService.Users
{
    public class UserModel : ModelBase
    {
        [BsonElement("username")]
        public string Username { get; set; }
        [BsonElement("password")]
        public string Password { get; set; }
        [BsonElement("role_id")]
        public ObjectId RoleId { get; set; }

        public RoleModel Role;
    }
}