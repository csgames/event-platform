using System;

namespace STS.Configuration
{
    public static class ConfigManager
    {
        // Mongo config
        public static string DatabaseConnectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING") ?? "";
        public static string DatabaseName = Environment.GetEnvironmentVariable("DB_NAME") ?? "";
        public static CertificatesConfig Certificates = new CertificatesConfig();
    }
}