using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityServer4.Models;
using Newtonsoft.Json;
using STS.Interface;
using STS.Models;

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
                client.Properties.TryGetValue("permissions", out var permissions);
                if (permissions == null) return client;
                var deserializedPermissions = JsonConvert.DeserializeObject<List<string>>(permissions);
                var permissionNames = deserializedPermissions
                    .Select(id => _dbRepository.Single<Permission>(p => p.Id == id)?.Name);
                client.Claims.Add(new Claim("permissions", JsonConvert.SerializeObject(permissionNames)));
                return client;
            });
        }
    }
}