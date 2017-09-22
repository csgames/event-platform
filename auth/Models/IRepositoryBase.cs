using System.Threading.Tasks;
using MongoDB.Bson;

namespace SecureTokenService.Models
{
    public interface IRepositoryBase<T>
    {
        Task Create(T model);
        Task<T[]> GetAll();
        Task<T> GetById(string id);
        T GetByIdSync(string id);
        Task<T> Update(T model);
        Task<bool> Delete(string id);
    }
}