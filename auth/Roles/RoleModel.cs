using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using SecureTokenService.Models;

namespace SecureTokenService.Roles
{
    public class RoleModel : ModelBase
    {
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("permissions")]
        public string[] Permissions { get; set; }
    }
}