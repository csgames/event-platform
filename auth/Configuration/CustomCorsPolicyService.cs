using System.Threading.Tasks;
using IdentityServer4.Services;

namespace STS.Configuration
{
    public class CustomCorsPolicyService: ICorsPolicyService
    {
        public Task<bool> IsOriginAllowedAsync(string origin)
        {
            return Task.Run(() => true);
        }
    }
}