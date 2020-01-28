using System;

namespace STS.Configuration
{
    public class CertificatesConfig
    {
        public string Path => Environment.GetEnvironmentVariable("CERTIFICATES_PATH");
        public string Password => Environment.GetEnvironmentVariable("CERTIFICATES_PASSWORD");
    }
}