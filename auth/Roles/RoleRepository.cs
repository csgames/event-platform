using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using SecureTokenService.Models;
using SecureTokenService.MongoDB;
using SecureTokenService.Permissions;

namespace SecureTokenService.Roles
{
    public class RoleRepository : RepositoryBase<RoleModel>, IRoleRepository
    {
        private IPermissionRepository _permissionRepository;

        public RoleRepository(IDatabase db, IPermissionRepository permissionRepository) : base(db.GetCollection<RoleModel>("roles"))
        {
            _permissionRepository = permissionRepository;
        }
        
        private async Task<RoleModel> PopulateModel(RoleModel role)
        {
            role.Permissions = await _permissionRepository.GetFromRole(role) as PermissionModel[];
            return role;
        }

        public new async Task<RoleModel> GetById(ObjectId id)
        {
            var user = await Collection.Find(new BsonDocument("_id", id)).Limit(1).FirstOrDefaultAsync();

            if (user == null)
                return null;

            user = await PopulateModel(user);

            return user;
        }
        
        public new async Task<IEnumerable<RoleModel>> GetAll()
        {
            var roles = await Collection.Find(new BsonDocument()).ToListAsync();

            if (roles == null)
                return null;

            return await Task.WhenAll(roles.Select(PopulateModel));
        }
    }
}