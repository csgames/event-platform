using MongoDB.Bson;
using System.Threading.Tasks;
using SecureTokenService.Models;
using SecureTokenService.Roles;

namespace SecureTokenService.Users
{
    public interface IUserRepository : IRepositoryBase<UserModel>
    {
        Task<UserModel> GetUserByUsername(string username);
        void SetRole(ObjectId id);
    }
}