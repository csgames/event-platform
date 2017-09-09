using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using SecureTokenService.MongoDB;

namespace SecureTokenService.Users
{
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<UserModel> _collection;

        public UserRepository(IDatabase db)
        {
            _collection = db.GetCollection<UserModel>("users");
        }

        public Task<List<UserModel>> GetAll()
        {
            return _collection.Find(new BsonDocument()).ToListAsync();
        }
    }
}