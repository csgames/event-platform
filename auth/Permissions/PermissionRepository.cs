using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Server.Kestrel.Internal.System.Collections.Sequences;
using MongoDB.Bson;
using MongoDB.Driver;
using SecureTokenService.Models;
using SecureTokenService.MongoDB;
using SecureTokenService.Roles;

namespace SecureTokenService.Permissions
{
    public class PermissionRepository : RepositoryBase<PermissionModel>, IPermissionRepository
    {
        public PermissionRepository(IDatabase db) : base(db.GetCollection<PermissionModel>("permissions"))
        {

        }

        public async Task<IEnumerable<PermissionModel>> GetFromRole(RoleModel role)
        {
            var array = new ObjectId[role.PermissionsId.Length];

            var i = 0;
            foreach (var permission in role.PermissionsId)
            {
                array[i++] = permission;
            }

            var filter = Builders<PermissionModel>.Filter.AnyIn("_id", array);
            var permissions = await Collection.Find(filter).ToListAsync();
            return permissions.ToArray();
        }
    }
}