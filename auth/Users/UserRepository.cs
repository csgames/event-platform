using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using SecureTokenService.Models;
using SecureTokenService.MongoDB;

namespace SecureTokenService.Users
{
    public class UserRepository : RepositoryBase<UserModel>, IUserRepository
    {
        public UserRepository(IDatabase db) : base(db.GetCollection<UserModel>("users"))
        {

        }

        public new Task Create(UserModel model)
        {
            model.Password = BCrypt.Net.BCrypt.HashPassword(model.Password);
            return Collection.InsertOneAsync(model);
        }

        public async Task<UserModel> GetUserByUsername(string username)
        {
            return await Collection.Find(u => u.Username == username).Limit(1).FirstOrDefaultAsync();
        }
    }
}