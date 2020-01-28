using System;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using IdentityServer4.Stores;
using Microsoft.IdentityModel.Tokens;
using STS.Service;

namespace STS.Store
{
    public class CustomSigningCredentialStore : ISigningCredentialStore
    {
        private readonly CertificatesGenerator _certificatesGenerator;

        public CustomSigningCredentialStore(CertificatesGenerator certificatesGenerator)
        {
            _certificatesGenerator = certificatesGenerator;
        }

        public Task<SigningCredentials> GetSigningCredentialsAsync()
        {
            var certificate = LoadCertificate();
            return Task.FromResult(new SigningCredentials(new X509SecurityKey(certificate), SecurityAlgorithms.RsaSha256));
        }

        private X509Certificate2 LoadCertificate()
        {
            var certificates = _certificatesGenerator.LoadCertificate();

            X509Certificate2 certificate = null;
            foreach (var cert in certificates)
            {
                if (certificate == null || certificate.NotAfter <= DateTime.Now.AddDays(2))
                {
                    certificate = cert;
                }
            }

            if (certificate == null)
            {
                certificate = _certificatesGenerator.GenerateCertificate();
                _certificatesGenerator.SaveCertificate(certificate);
            }

            return certificate;
        }
    }
}