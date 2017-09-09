using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;

namespace SecureTokenService.Models
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T: ModelBase 
    {
        protected readonly IMongoCollection<T> Collection;

        protected RepositoryBase(IMongoCollection<T> collection)
        {
            Collection = collection;
        }

        public Task Create(T model)
        {
            return Collection.InsertOneAsync(model);
        }

        public async Task<T[]> GetAll()
        {
            return (await Collection.Find(new BsonDocument()).ToListAsync()).ToArray();
        }

        public async Task<T> GetById(ObjectId id)
        {
            return (await Collection.Find(new BsonDocument("_id", id)).ToListAsync()).ToArray()[0];
        }

        public async Task<T> Update(T model)
        {
            var result = await Collection.ReplaceOneAsync(new BsonDocument("_id", model.Id), model);

            if (result.IsAcknowledged)
            {
                return await GetById(model.Id);
            }

            return null;
        }

        public async Task<bool> Delete(ObjectId id)
        {
            var result = await Collection.DeleteOneAsync(new BsonDocument("_id", id));

            return result.IsAcknowledged;
        }
    }
}