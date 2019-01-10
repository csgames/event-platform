using System;
using System.Collections.Generic;
using IdentityServer4.Models;
using STS.Models;

namespace STS
{
    public static class Config
    {
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("sts_api", "STS Api")
            };
        }

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResource
                {
                    Name = "permissions",
                    DisplayName = "Client permissions",
                    Description = "Permissions",
                    UserClaims = new List<string>
                    {
                        "permissions"
                    }
                }
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "sts",
                    ClientName = "STS",

                    AllowedGrantTypes = GrantTypes.ClientCredentials,

                    AllowedScopes =
                    {
                        "sts_api"
                    }
                },
                new Client
                {
                    ClientId = "client-sts",
                    ClientName = "Client STS",

                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                    AllowOfflineAccess = true,

                    AllowedScopes =
                    {
                        "sts_api"
                    }
                }
            };
        }

        public static IEnumerable<Permission> GetPermissions()
        {
            var resources = new List<string>
            {
                "client",
                "permission",
                "resource",
                "role",
                "user"
            };
            var types = new List<string>
            {
                "create",
                "get",
                "get-all",
                "update",
                "delete"
            };

            var permissions = new List<Permission>();
            foreach (var resource in resources)
            {
                foreach (var type in types)
                {
                    permissions.Add(new Permission
                    {
                        Name = $"sts:{type}:{resource}"
                    });
                }
            }

            permissions.Add(new Permission
            {
                Name = "sts:update-admin:user"
            });

            return permissions;
        }

        public static IEnumerable<Role> GetRoles()
        {
            return new List<Role>
            {
                new Role
                {
                    Name = "admin"
                }
            };
        }

        public static IEnumerable<User> GetUsers()
        {
            return new List<User>
            {
                new User
                {
                    Username = "admin"
                }
            };
        }
    }
}
