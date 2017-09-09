using System.Collections.Generic;
using System.Threading.Tasks;

namespace SecureTokenService.Users
{
    public interface IUserRepository
    {
        Task<List<UserModel>> GetAll();
    }
}