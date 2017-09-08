using MongoDB.Driver;
using SecureTokenService.Interfaces;

namespace SecureTokenService.Models
{
    public class Database : IDatabase
    {
        private readonly IMongoDatabase _db;

        public Database()
        {
            var credential = Environment.Get("DB_USERNAME") + ":" + Environment.Get("DB_PASSWORD");
            var url = "mongodb://" + Environment.Get("DB_HOST") + ":27017";
            var client = new MongoClient(url);
            _db = client.GetDatabase(Environment.Get("DB_NAME"));
        }

        public IMongoCollection<T> GetCollection<T>(string name)
        {
            return _db.GetCollection<T>(name);
        }
    }
}