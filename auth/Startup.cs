using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using IdentityModel;
using IdentityServer4.Models;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson.Serialization;
using Newtonsoft.Json;
using PolyHxDotNetServices.Mail;
using PolyHxDotNetServices.Sts;
using STS.Configuration;
using STS.Extension;
using STS.Store;
using STS.Models;
using STS.Service;
using STS.Utils;
using STS.Workers;

namespace STS
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHsts(options =>
            {
                options.Preload = true;
                options.IncludeSubDomains = true;
                options.MaxAge = TimeSpan.FromDays(365);
            });
            services.AddCors(options =>
            {
                options.AddPolicy("default", policy =>
                {
                    policy.WithOrigins(Environment.GetEnvironmentVariable("ALLOW_ORIGINS")?.Split(" "))
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });

            services.AddMvc();
            services.AddIdentityServer(x => x.IssuerUri = Environment.GetEnvironmentVariable("ISSUER_URI"))
                .AddMongoRepository()
                .AddClients()
                .AddIdentityApiResources()
                .AddPersistedGrants()
                .AddProfileService<ProfileService>();

            services.AddSingleton(new CertificatesGenerator(Configuration));
            services.AddTransient<IResourceOwnerPasswordValidator, CustomResourceOwnerPasswordValidator>();
            services.AddTransient<IProfileService, ProfileService>();
            services.AddTransient<IPersistedGrantStore, CustomPersistedGrantStore>();
            services.AddTransient<ISigningCredentialStore, CustomSigningCredentialStore>();
            services.AddTransient<IValidationKeysStore, CustomValidationKeysStore>();
            services.AddSingleton<ICorsPolicyService, CustomCorsPolicyService>();
            
            services.AddSingleton<IHostedService, CertificatesBackgroundWorker>();
            services.AddSingleton<IHostedService, PersistedGrantBackgroundWorker>();

            var stsService = new StsService();
            var mailService = new MailService(stsService);
            services.AddSingleton<IStsService>(stsService);
            services.AddSingleton<IMailService>(mailService);

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKeyResolver = (token, securityToken, kid, parameters) =>
                {
                    var keys = new List<SecurityKey>();
                    try
                    {
                        var client = new HttpClient();
                        var disco = JsonConvert.DeserializeObject<JsonWebKeySet>(
                            client.GetAsync($"{Environment.GetEnvironmentVariable("STS_API_URL")}/.well-known/openid-configuration/jwks")
                                .Result.Content.ReadAsStringAsync().Result
                        );

                        foreach (var webKey in disco.Keys)
                        {
                            var e = Base64Url.Decode(webKey.E);
                            var n = Base64Url.Decode(webKey.N);

                            var key = new RsaSecurityKey(new RSAParameters {Exponent = e, Modulus = n})
                            {
                                KeyId = webKey.Kid
                            };

                            keys.Add(key);
                        }

                        return keys;
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e);
                    }

                    return keys;
                },
                ValidIssuers = Environment.GetEnvironmentVariable("ISSUERS")?.Split(","),
                ValidAudiences = Environment.GetEnvironmentVariable("AUDIENCE")?.Split(","),
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => {
                    options.TokenValidationParameters = tokenValidationParameters;
                    options.SaveToken = true;
                });
            
            services.AddAuthorization(options =>
            {
                options.DefaultPolicy = new AuthorizationPolicyBuilder(JwtBearerDefaults.AuthenticationScheme).RequireAuthenticatedUser().Build();
            });
            
            services.AddMvc(options => options.EnableEndpointRouting = false);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }
            
            app.UseCors("default");
            app.UseIdentityServer();
            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();

            ConfigureMongoDriver2IgnoreExtraElements();

            Init.InitDatabase(app);
        }

        private static void ConfigureMongoDriver2IgnoreExtraElements()
        {
            BsonClassMap.RegisterClassMap<Client>(cm =>
            {
                cm.AutoMap();
                cm.SetIgnoreExtraElements(true);
            }); 
            BsonClassMap.RegisterClassMap<Claim>(cm =>
            {
                cm.AutoMap();
                cm.SetIgnoreExtraElements(true);
            });
            BsonClassMap.RegisterClassMap<IdentityResource>(cm =>
            {
                cm.AutoMap();
                cm.SetIgnoreExtraElements(true);
            });
            BsonClassMap.RegisterClassMap<ApiResource>(cm =>
            {
                cm.AutoMap();
                cm.SetIgnoreExtraElements(true);
            });
            BsonClassMap.RegisterClassMap<PersistedGrant>(cm =>
            {
                cm.AutoMap();
                cm.SetIgnoreExtraElements(true);
            });
            BsonClassMap.RegisterClassMap<Permission>(cm =>
            {
                cm.AutoMap();
                cm.SetIgnoreExtraElements(true);
            });
            BsonClassMap.RegisterClassMap<Role>(cm =>
            {
                cm.AutoMap();
                cm.SetIgnoreExtraElements(true);
            });
            BsonClassMap.RegisterClassMap<User>(cm =>
            {
                cm.AutoMap();
                cm.SetIgnoreExtraElements(true);
            });
        }
    }
}
