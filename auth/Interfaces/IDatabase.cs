using MongoDB.Driver;

namespace SecureTokenService.Interfaces
{
    public interface IDatabase
    {
        IMongoCollection<T> GetCollection<T>(string name);
    }
}