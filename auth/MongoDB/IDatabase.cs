using MongoDB.Driver;

namespace SecureTokenService.MongoDB
{
    public interface IDatabase
    {
        IMongoCollection<T> GetCollection<T>(string name);
    }
}