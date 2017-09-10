using System.Threading.Tasks;
using SecureTokenService.Models;

namespace SecureTokenService.Users
{
    public interface IUserRepository : IRepositoryBase<UserModel>
    {
        Task<UserModel> GetUserByUsername(string username);
    }
}