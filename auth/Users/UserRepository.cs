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
    }
}