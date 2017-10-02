using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using IdentityServer4.Models;
using IdentityServer4.Services;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson.Serialization;
using STS.Extension;
using STS.Interface;
using STS.Store;
using STS.User;

namespace STS
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        
        private readonly X509Certificate2 _cert = new X509Certificate2(Environment.GetEnvironmentVariable("CERT_PATH"),
            Environment.GetEnvironmentVariable("CERT_PASSWORD"));

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddMvc();
            services.AddIdentityServer()
                .AddSigningCredential(_cert)
                .AddMongoRepository()
                .AddClients()
                .AddIdentityApiResources()
                .AddPersistedGrants()
                .AddProfileService<ProfileService>();

            services.AddTransient<IResourceOwnerPasswordValidator, CustomResourceOwnerPasswordValidator>();
            services.AddTransient<IProfileService, ProfileService>();
            
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new X509SecurityKey(_cert),
                ValidIssuers = Environment.GetEnvironmentVariable("ISSUERS").Split(","),
                ValidAudiences = Environment.GetEnvironmentVariable("AUDIENCE").Split(","),
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

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseDeveloperExceptionPage();
            app.UseIdentityServer();
            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();
           
            ConfigureMongoDriver2IgnoreExtraElements();

            InitializeDatabase(app);
        }


        private static void InitializeDatabase(IApplicationBuilder app)
        {
            var createdNewRepository = false;
            var repository = app.ApplicationServices.GetService<IRepository>();

            if (!repository.CollectionExists<Client>())
            {
                foreach (var client in Config.GetClients())
                {
                    repository.Add<Client>(client);
                }
                createdNewRepository = true;
            }
            
            if (!repository.CollectionExists<IdentityResource>())
            {
                foreach (var res in Config.GetIdentityResources())
                {
                    repository.Add<IdentityResource>(res);
                }
                createdNewRepository = true;
            }

            if (!repository.CollectionExists<ApiResource>())
            {
                foreach (var api in Config.GetApiResources())
                {
                    repository.Add<ApiResource>(api);
                }
                createdNewRepository = true;
            }

            if (createdNewRepository)
            {
                throw new Exception(
                    "Mongo Repository created/populated! Please restart so Mongo driver will be configured to ignore Extra Elements.");
            }
        }

        private static void ConfigureMongoDriver2IgnoreExtraElements()
        {
            BsonClassMap.RegisterClassMap<Client>(cm =>
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
            BsonClassMap.RegisterClassMap<User.User>(cm =>
            {
                cm.AutoMap();
                cm.SetIgnoreExtraElements(true);
            });
        }
    }
}