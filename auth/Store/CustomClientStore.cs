using System.Security.Claims;
using System.Threading.Tasks;
using IdentityServer4.Models;
using STS.Interface;

namespace STS.Store
{
    public class CustomClientStore : IdentityServer4.Stores.IClientStore
    {
        private readonly IRepository _dbRepository;

        public CustomClientStore(IRepository repository)
        {
            _dbRepository = repository;
        }

        public Task<Client> FindClientByIdAsync(string clientId)
        {
            return Task.Run(() =>
            {
                var client = _dbRepository.Single<Client>(c => c.ClientId == clientId);
                foreach (var prop in client.Properties)
                {
                    client.Claims.Add(new Claim(prop.Key, prop.Value));
                }
                return client;
            });
        }
    }
}