using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using SecureTokenService.Models;
using SecureTokenService.MongoDB;

namespace SecureTokenService.Roles
{
    public class RoleRepository : RepositoryBase<RoleModel>, IRoleRepository
    {
        public RoleRepository(IDatabase db) : base(db.GetCollection<RoleModel>("roles"))
        {

        }
    }
}