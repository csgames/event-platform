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
        
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("permissions_id")]
        public string[] PermissionsId { get; set; }
        
        public PermissionModel[] Permissions { get; set; }
    }
}