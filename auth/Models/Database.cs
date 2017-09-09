using System;
using MongoDB.Driver;
using SecureTokenService.Config;
using SecureTokenService.Interfaces;

namespace SecureTokenService.Models
{
    public class Database : IDatabase
    {
        private readonly IMongoDatabase _db;

        public Database()
        {
            try
            {
                var client = new MongoClient(ConfigManager.DatabaseConnectionString);
                _db = client.GetDatabase(ConfigManager.DatabaseName);
                Console.WriteLine(_db != null
                    ? $"Successfully connected to MongoDB with connection string {ConfigManager.DatabaseConnectionString}"
                    : $"Failed to connect to MongoDB with connection string {ConfigManager.DatabaseConnectionString}");
            }
            catch (Exception e)
            {
                Console.WriteLine($"Failed to connect to MongoDB with connection string {ConfigManager.DatabaseConnectionString}");
            }
        }

        public IMongoCollection<T> GetCollection<T>(string name)
        {
            return _db.GetCollection<T>(name);
        }
    }
}