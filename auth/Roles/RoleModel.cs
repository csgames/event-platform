using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using SecureTokenService.Models;
using SecureTokenService.Permissions;

namespace SecureTokenService.Roles
{
    public class RoleModel : ModelBase
    {
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("permissions_id")]
        public ObjectId[] PermissionsId { get; set; }
        
        public PermissionModel[] Permissions { get; set; }
    }
}