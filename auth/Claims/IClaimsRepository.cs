using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SecureTokenService.Claims
{
    public interface IClaimsRepository
    {
        Task<List<Claim>> GetAll();
        
        Task<Claim> GetClaimForUser(string userId);
        Task<Claim> SetClaimForUser(Claim claim);
        Task DeleteClaimForUser(string userId);
        
    }
}