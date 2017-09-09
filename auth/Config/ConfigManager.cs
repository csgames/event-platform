namespace SecureTokenService.Config
{
    public static class ConfigManager
    {
        // Mongo config
        public static string DatabaseHost = Environment.Get("DB_HOST");
        public static string DatabaseName = Environment.Get("DB_NAME");
        public static string DatabaseUsername = Environment.Get("DB_USERNAME");
        public static string DatabasePassword = Environment.Get("DB_PASSWORD");
    }
}