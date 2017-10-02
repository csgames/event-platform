using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace STS.User
{
    public class Role
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        
        [BsonElement("name")]
        public string Name { get; set; }
        
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("permissions")]
        public string[] Permissions { get; set; }
    }
}