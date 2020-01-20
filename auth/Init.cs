using System;
using System.Collections.Generic;
using System.Linq;
using IdentityServer4.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using STS.Interface;
using STS.Models;
using STS.Utils;

namespace STS
{
    public class Init
    {
        public static void InitDatabase(IApplicationBuilder app)
        {
            var repository = app.ApplicationServices.GetService<IRepository>();

            if (!repository.CollectionExists<Client>())
            {
                InitClient(repository);
            }

            if (!repository.CollectionExists<IdentityResource>())
            {
                InitIdentityResources(repository);
            }

            if (!repository.CollectionExists<ApiResource>())
            {
                InitApiResources(repository);
            }

            if (!repository.CollectionExists<Permission>())
            {
                InitPermissions(repository);
            }

            if (!repository.CollectionExists<Role>())
            {
                InitRoles(repository);
            }

            if (!repository.CollectionExists<User>())
            {
                InitUsers(repository);
            }
        }

        private static void InitClient(IRepository repository)
        {
            Console.WriteLine("------------ Initializing clients ------------");
            var clients = Config.GetClients();

            foreach (var client in clients)
            {
                var secret = CredentialGenerator.GenerateClientSecret(40);
                client.ClientSecrets = new List<Secret>
                {
                    new Secret(secret.Sha256())
                };
                
                repository.Add(client);
                
                Console.WriteLine("New client added");
                Console.WriteLine($"ClientId: {client.ClientId}");
                Console.WriteLine($"ClientSecret: {secret}");
                Console.WriteLine("");
            }
        }

        private static void InitIdentityResources(IRepository repository)
        {
            Console.WriteLine("------------ Initializing identity resources ------------");
            var resources = Config.GetIdentityResources();

            foreach (var resource in resources)
            {
                repository.Add(resource);
                Console.WriteLine("New identity resource added");
                Console.WriteLine($"Name: {resource.Name}");
                Console.WriteLine("");
            }
        }

        private static void InitApiResources(IRepository repository)
        {
            Console.WriteLine("------------ Initializing api resources ------------");
            var resources = Config.GetApiResources();

            foreach (var resource in resources)
            {
                repository.Add(resource);
                Console.WriteLine("New api resource added");
                Console.WriteLine($"Name: {resource.Name}");
                Console.WriteLine("");
            }
        }

        private static void InitPermissions(IRepository repository)
        {
            Console.WriteLine("------------ Initializing permissions ------------");
            var permissions = Config.GetPermissions().ToArray();

            foreach (var permission in permissions)
            {
                repository.Add(permission);
            }
            
            
            Console.WriteLine($"{permissions.Length} permissions added");
            Console.WriteLine("");
        }

        private static void InitRoles(IRepository repository)
        {
            Console.WriteLine("------------ Initializing roles ------------");
            var roles = Config.GetRoles();
            var permissions = repository.All<Permission>().Select(x => x.Id).ToArray();

            foreach (var role in roles)
            {
                role.Permissions = permissions;
                repository.Add(role);
                Console.WriteLine("New role added");
                Console.WriteLine($"Name: {role.Name}");
                Console.WriteLine("");
            }
        }

        private static void InitUsers(IRepository repository)
        {
            Console.WriteLine("------------ Initializing users ------------");
            var users = Config.GetUsers();
            var role = repository.Single<Role>(x => x.Name == "admin");

            foreach (var user in users)
            {
                var password = CredentialGenerator.GeneratePassword(10);
                user.RoleId = role.Id;
                user.Password = BCrypt.Net.BCrypt.HashPassword(password);
                repository.Add(user);
                Console.WriteLine("New user added");
                Console.WriteLine($"Username: {user.Username}");
                Console.WriteLine($"Password: {password}");
                Console.WriteLine("");
            }
        }
    }
}