using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using MongoDB.Bson;
using MongoDB.Driver;
using SecureTokenService.Models;

namespace SecureTokenService.Interfaces
{
    public interface IRepositoryBase<T>
    {
        Task Create(T model);
        Task<T[]> GetAll();
        Task<T> GetById(ObjectId id);
        Task<T> Update(T model);
        Task<bool> Delete(ObjectId id);
    }
}