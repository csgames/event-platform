using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer4.Models;
using IdentityServer4.Stores;
using STS.Interface;

namespace STS.Store
{
    public class CustomPersistedGrantStore : IPersistedGrantStore
    {
        protected IRepository _dbRepository;

        public CustomPersistedGrantStore(IRepository repository)
        {
            _dbRepository = repository;
        }

        public Task<IEnumerable<PersistedGrant>> GetAllAsync(string subjectId)
        {
            return Task.Run(() =>
            {
                var result = _dbRepository.Where<PersistedGrant>(i => i.SubjectId == subjectId);
                return result.AsEnumerable();
            });

        }

        public Task<PersistedGrant> GetAsync(string key)
        {
            return Task.Run(() =>
            {
                var result = _dbRepository.Single<PersistedGrant>(i => i.Key == key);
                return result;
            });

        }

        public Task RemoveAllAsync(string subjectId, string clientId)
        {
            return Task.Run(() =>
            {
                _dbRepository.Delete<PersistedGrant>(i => i.SubjectId == subjectId && i.ClientId == clientId);

                return;
            });
        }

        public Task RemoveAllAsync(string subjectId, string clientId, string type)
        {

            return Task.Run(() =>
            {
                _dbRepository.Delete<PersistedGrant>(i => i.SubjectId == subjectId && i.ClientId == clientId && i.Type == type);

                return;
            });
        }

        public Task RemoveAsync(string key)
        {
            return Task.Run(() =>
            {
                _dbRepository.Delete<PersistedGrant>(i => i.Key == key);

                return;
            });
        }

        public Task StoreAsync(PersistedGrant grant)
        {
            return Task.Run(() =>
            {
                _dbRepository.Add<PersistedGrant>(grant);

                return;
            });
        }
    }
}