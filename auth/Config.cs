using System;
using System.Collections.Generic;
using System.Security.Claims;
using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;
using Newtonsoft.Json;

namespace STS
{
    public static class Config
    {
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("sts_api", "STS Api"),
                new ApiResource("event_management_api", "PolyHx EventManagement Api"),
                new ApiResource("mail_api", "PolyHx Mail Api")
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
                        "sts_api",
                        "mail_api"
                    }
                },
                new Client
                {
                    ClientId = "webhook_decoder",
                    ClientName = "WebHook Decoder",
                    ClientSecrets = { new Secret(Environment.GetEnvironmentVariable("WEBHOOK_DECODER_CLIENT_SECRET").Sha256()) },

                    AllowedGrantTypes = GrantTypes.ClientCredentials,

                    AllowedScopes =
                    {
                        "sts_api"
                    }
                },
                new Client
                {
                    ClientId = "event_management",
                    ClientName = "Event Management Service",
                    ClientSecrets = { new Secret(Environment.GetEnvironmentVariable("EVENT_MANAGEMENT_CLIENT_SECRET").Sha256()) },

                    AllowedGrantTypes = GrantTypes.ClientCredentials,

                    AllowOfflineAccess = true,
                    
                    AllowedScopes =
                    {
                        "sts_api",
                        "mail_api"
                    }
                },
                new Client
                {
                    ClientId = "mail",
                    ClientName = "Mail Service",
                    ClientSecrets = { new Secret(Environment.GetEnvironmentVariable("MAIL_CLIENT_SECRET").Sha256()) },

                    AllowedGrantTypes = GrantTypes.ClientCredentials,

                    AllowOfflineAccess = true,
                    
                    AllowedScopes =
                    {
                        "sts_api"
                    }
                },
                new Client
                {
                    ClientId = "polyhx_dashboard",
                    ClientName = "PolyHx Dashboard",
                    ClientSecrets = { new Secret(Environment.GetEnvironmentVariable("POLYHX_DASHBOARD_CLIENT_SECRET").Sha256()) },

                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,

                    AllowOfflineAccess = true,
                    
                    AllowedScopes =
                    {
                        "offline_access",
                        "sts_api",
                        "event_management_api"
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
                        "sts_api",
                        "event_management_api"
                    }
                }
            };
        }
    }
}
