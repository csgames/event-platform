using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace STS.Models
{
    public class ConfirmEmail
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }
        
        public string Uuid { get; set; }
        
        public bool Used { get; set; }
    }
}