using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer4.Models;
using IdentityServer4.Stores;
using Microsoft.IdentityModel.Tokens;
using STS.Service;

namespace STS.Store
{
    public class CustomValidationKeysStore : IValidationKeysStore
    {
        private readonly CertificatesGenerator _certificatesGenerator;

        public CustomValidationKeysStore(CertificatesGenerator certificatesGenerator)
        {
            _certificatesGenerator = certificatesGenerator;
        }

        public Task<IEnumerable<SecurityKeyInfo>> GetValidationKeysAsync()
        {
            var certificates = _certificatesGenerator.LoadCertificate();
            return Task.FromResult(certificates.Select(x => new SecurityKeyInfo
            {
                Key = new X509SecurityKey(x),
                SigningAlgorithm = SecurityAlgorithms.Sha256
            }));
        }
    }
}