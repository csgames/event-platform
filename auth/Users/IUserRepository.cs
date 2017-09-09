using MongoDB.Bson;
using SecureTokenService.Models;
using SecureTokenService.Roles;

namespace SecureTokenService.Users
{
    public interface IUserRepository : IRepositoryBase<UserModel>
    {
        void SetRole(ObjectId id);
    }
}