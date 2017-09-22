using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SecureTokenService.Helpers;
using SecureTokenService.MongoDB;
using SecureTokenService.Permissions;
using SecureTokenService.Redis;
using SecureTokenService.Roles;
using SecureTokenService.Users;

namespace SecureTokenService
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
            services.AddMvc();
            services.AddSingleton<IDatabase>(new Database());
            services.AddSingleton(new RedisManager());
            services.AddSingleton<ITokenHelper, TokenHelper>();
            services.AddSingleton<IPermissionRepository, PermissionRepository>();
            services.AddSingleton<IRoleRepository, RoleRepository>();
            services.AddSingleton<IUserRepository, UserRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();
        }
    }
}