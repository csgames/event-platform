using System;
using MongoDB.Driver;
using SecureTokenService.Interfaces;

namespace SecureTokenService.Models
{
    public class Database : IDatabase
    {
        private readonly IMongoDatabase _db;

        public Database()
        {
            var credentials = $"{Environment.Get("DB_USERNAME")}:{Environment.Get("DB_PASSWORD")}";
            var connectionString = $"mongodb://{Environment.Get("DB_HOST")}:27017";
            var client = new MongoClient(connectionString);
            _db = client.GetDatabase(Environment.Get("DB_NAME"));
            Console.WriteLine(_db != null
                ? $"Successfully connected to MongoDB with connection string {connectionString}"
                : $"Failed to connect to MongoDB with connection string {connectionString}");
        }

        public IMongoCollection<T> GetCollection<T>(string name)
        {
            return _db.GetCollection<T>(name);
        }
    }
}