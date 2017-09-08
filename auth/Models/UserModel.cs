using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SecureTokenService.Models
{
    public class UserModel
    {
        public ObjectId Id { get; set; }
        [BsonElement("username")]
        public string Username { get; set; }
    }
}