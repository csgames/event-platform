using System;
using SecureTokenService.Config;
using ServiceStack.Redis;

namespace SecureTokenService.Redis
{
    public class RedisManager
    {
        public IRedisClient Client { get; }

        public RedisManager()
        {
            try
            {
                var manager = new RedisManagerPool(ConfigManager.RedisConnectionString);
                Client = manager.GetClient();
                Console.WriteLine(Client != null
                    ? $"Successfully connected to Redis with connection string {ConfigManager.RedisConnectionString}"
                    : $"Failed to connect to Redis with connection string {ConfigManager.RedisConnectionString}");
            }
            catch (Exception)
            { 
                Console.WriteLine($"Failed to connect to Redis with connection string {ConfigManager.RedisConnectionString}");
            }
        }

        ~RedisManager()
        {
            Client.Dispose();
        }
    }
}