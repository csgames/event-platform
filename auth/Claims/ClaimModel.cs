using System;
using MongoDB.Bson;

namespace SecureTokenService.Claims
{   
    public class ClaimModel
    {
        public object Payload { get; set; }
        public DateTime Expiration { get; set; }
    }
}