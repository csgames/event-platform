using System;
using System.Collections.Generic;
using System.Security.Claims;
using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;

namespace STS
{
    public static class Config
    {
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("sts_api", "STS Api"),
                new ApiResource("lhgames_management_api", "LH Games Management Api"),
                new ApiResource("lhgames_game_api", "LH Games Game Api"),
                new ApiResource("lhgames_deployment_runner_api", "LH Games Deployment Runner Api"),
                new ApiResource("lhgames_bob_the_builder_api", "LH Games Bob the Builder Api")
            };
        }

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResource()
                {
                    Name = "permissions",
                    DisplayName = "Client permissions",
                    Description = "Permissions",
                    UserClaims = new List<string>()
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
                    ClientSecrets = { new Secret(Environment.GetEnvironmentVariable("STS_CLIENT_SECRET").Sha256()) },

                    AllowedGrantTypes = GrantTypes.ClientCredentials,

                    AllowedScopes =
                    {
                        "sts_api"
                    }
                },
                new Client
                {
                    ClientId = "lhgames_management_backend",
                    ClientName = "LH Games Management Backend",
                    ClientSecrets = { new Secret(Environment.GetEnvironmentVariable("LH_MANAGEMENT_BACKEND_CLIENT_SECRET").Sha256()) },

                    AllowedGrantTypes = GrantTypes.ClientCredentials,

                    AllowedScopes =
                    {
                        "sts_api",
                        "lhgames_management_api",
                        "lhgames_game_api",
                        "lhgames_deployment_runner_api",
                        "lhgames_bob_the_builder_api"
                    }
                },
                new Client
                {
                    ClientId = "event_multiplexer",
                    ClientName = "Event Multiplexer",
                    ClientSecrets = { new Secret(Environment.GetEnvironmentVariable("EVENT_MUX_CLIENT_SECRET").Sha256()) },

                    AllowedGrantTypes = GrantTypes.ClientCredentials,

                    AllowedScopes =
                    {
                        "sts_api",
                        "lhgames_management_api",
                        "lhgames_game_api",
                        "lhgames_deployment_runner_api",
                        "lhgames_bob_the_builder_api"
                    }
                },
                new Client
                {
                    ClientId = "bob_the_builder",
                    ClientName = "Bob the Builder",
                    ClientSecrets = { new Secret(Environment.GetEnvironmentVariable("BOB_THE_BUILDER_CLIENT_SECRET").Sha256()) },

                    AllowedGrantTypes = GrantTypes.ClientCredentials,

                    AllowedScopes =
                    {
                        "sts_api",
                        "lhgames_management_api",
                        "lhgames_game_api",
                        "lhgames_deployment_runner_api",
                        "lhgames_bob_the_builder_api"
                    }
                },
                new Client
                {
                    ClientId = "lh_game_server",
                    ClientName = "LH Games Game Server",
                    ClientSecrets = { new Secret(Environment.GetEnvironmentVariable("LH_GAME_SERVER_CLIENT_SECRET").Sha256()) },

                    AllowedGrantTypes = GrantTypes.ClientCredentials,

                    AllowedScopes =
                    {
                        "sts_api",
                        "lhgames_management_api",
                        "lhgames_game_api",
                        "lhgames_deployment_runner_api",
                        "lhgames_bob_the_builder_api"
                    }
                },
                new Client
                {
                    ClientId = "lh_management_frontend",
                    ClientName = "LH Games Management Frontend",
                    ClientSecrets = { new Secret(Environment.GetEnvironmentVariable("LH_MANAGEMENT_FRONTEND_CLIENT_SECRET").Sha256()) },

                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,

                    AllowOfflineAccess = true,
                    
                    AllowedScopes =
                    {
                        "offline_access",
                        "lhgames_management_api"
                    }
                },
                new Client
                {
                    ClientId = "admin_frontend",
                    ClientName = "Admin Frontend",
                    ClientSecrets = { new Secret(Environment.GetEnvironmentVariable("ADMIN_FRONTEND_CLIENT_SECRET").Sha256()) },

                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,

                    AllowOfflineAccess = true,
                    
                    AllowedScopes =
                    {
                        "offline_access",
                        "sts_api",
                        "lhgames_management_api",
                        "lhgames_game_api",
                        "lhgames_deployment_runner_api",
                        "lhgames_bob_the_builder_api"
                    }
                },
                new Client
                {
                    ClientId = "admin_mobile_app",
                    ClientName = "Admin Mobile App",
                    ClientSecrets = { new Secret(Environment.GetEnvironmentVariable("ADMIN_MOBILE_APP_CLIENT_SECRET").Sha256()) },

                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,

                    AllowOfflineAccess = true,
                    
                    AllowedScopes =
                    {
                        "offline_access",
                        "lhgames_management_api"
                    }
                }
            };
        }
    }
}
