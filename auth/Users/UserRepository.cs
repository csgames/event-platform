using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using SecureTokenService.Models;
using SecureTokenService.MongoDB;
using SecureTokenService.Roles;

namespace SecureTokenService.Users
{
    public class UserRepository : RepositoryBase<UserModel>, IUserRepository
    {
        private IRoleRepository _roleRepository;

        public UserRepository(IDatabase db, IRoleRepository roleRepository) : base(db.GetCollection<UserModel>("users"))
        {
            _roleRepository = roleRepository;
        }

        private async Task<UserModel> PopulateUserModel(UserModel user)
        {
            user.Role = await _roleRepository.GetById(user.RoleId);
            return user;
        }

        public new async Task<UserModel> GetById(ObjectId id)
        {
            var user = await Collection.Find(new BsonDocument("_id", id)).Limit(1).FirstOrDefaultAsync();

            if (user == null)
                return null;

            user = await PopulateUserModel(user);

            return user;
        }
        
        public new async Task<IEnumerable<UserModel>> GetAll()
        {
            var users = await Collection.Find(new BsonDocument()).ToListAsync();

            if (users == null)
                return null;

            return await Task.WhenAll(users.Select(PopulateUserModel));
        }
        
        public void SetRole(ObjectId id)
        {
            
        }
    }
}