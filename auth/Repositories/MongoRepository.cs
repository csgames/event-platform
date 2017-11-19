using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using MongoDB.Driver;
using STS.Configuration;
using STS.Interface;

namespace STS.Repositories
{
    public class MongoRepository : IRepository
    {
        private static IMongoDatabase _database;

        public MongoRepository()
        {
            var client = new MongoClient(ConfigManager.DatabaseConnectionString);
            _database = client.GetDatabase(ConfigManager.DatabaseName);
        }


        public IQueryable<T> All<T>() where T : class, new()
        {
            return _database.GetCollection<T>(typeof(T).Name).AsQueryable();
        }

        public IQueryable<T> Where<T>(System.Linq.Expressions.Expression<Func<T, bool>> expression)
            where T : class, new()
        {
            return All<T>().Where(expression);
        }

        public void Delete<T>(System.Linq.Expressions.Expression<Func<T, bool>> predicate) where T : class, new()
        {
            _database.GetCollection<T>(typeof(T).Name).DeleteMany(predicate);
        }

        public T Single<T>(System.Linq.Expressions.Expression<Func<T, bool>> expression) where T : class, new()
        {
            return All<T>().Where(expression).SingleOrDefault();
        }

        public bool CollectionExists<T>() where T : class, new()
        {
            var collection = _database.GetCollection<T>(typeof(T).Name);
            var filter = new BsonDocument();
            var totalCount = collection.Count(filter);
            return totalCount > 0;
        }

        public void Add<T>(T item) where T : class, new()
        {
            _database.GetCollection<T>(typeof(T).Name).InsertOne(item);
        }

        public void Add<T>(IEnumerable<T> items) where T : class, new()
        {
            _database.GetCollection<T>(typeof(T).Name).InsertMany(items);
        }

        public void Update<T>(string id, Dictionary<string, object> set) where T : class, new()
        {
            var collection = _database.GetCollection<T>(typeof(T).Name);
            var builder = Builders<T>.Filter;
            var filter = builder.Eq("_id", new ObjectId(id));
            var update = set.Aggregate(Builders<T>.Update.Combine(), (current, up) => current.Set(up.Key, up.Value));
            collection.UpdateOne(filter, update);
        }

        public void Replace<T>(System.Linq.Expressions.Expression<Func<T, bool>> expression, T replaceValue) where T : class, new()
        {
            var collection = _database.GetCollection<T>(typeof(T).Name);
            collection.ReplaceOne(expression, replaceValue);
        }
    }
}