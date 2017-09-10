using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using SecureTokenService.Models;
using SecureTokenService.Roles;

namespace SecureTokenService.Permissions
{
    public interface IPermissionRepository : IRepositoryBase<PermissionModel>
    {
        Task<IEnumerable<PermissionModel>> GetFromRole(RoleModel role);
    }
}