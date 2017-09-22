using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SecureTokenService.Models
{
    public class ModelBase
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
    }
}