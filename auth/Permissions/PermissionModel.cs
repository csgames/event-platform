using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using SecureTokenService.Models;
using SecureTokenService.Roles;

namespace SecureTokenService.Permissions
{
    public class PermissionModel : ModelBase
    {
        [BsonElement("name")]
        public string Name { get; set; }
    }
}