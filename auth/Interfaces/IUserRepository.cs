using System.Collections.Generic;
using System.Threading.Tasks;
using SecureTokenService.Models;

namespace SecureTokenService.Interfaces
{
    public interface IUserRepository
    {
        Task<List<UserModel>> GetAll();
    }
}