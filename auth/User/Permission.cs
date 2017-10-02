using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace STS.User
{
    public class Permission
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        
        [BsonElement("name")]
        public string Name { get; set; }
    }
}