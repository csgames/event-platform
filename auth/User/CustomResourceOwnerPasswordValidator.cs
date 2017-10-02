using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer4.Models;
using IdentityServer4.Test;
using IdentityServer4.Validation;
using MongoDB.Bson.IO;
using STS.Interface;
using JsonConvert = Newtonsoft.Json.JsonConvert;

namespace STS.User
{
    public class CustomResourceOwnerPasswordValidator: IResourceOwnerPasswordValidator
    {
        private readonly IRepository _db;

        public CustomResourceOwnerPasswordValidator(IRepository db)
        {
            _db = db;
        }
        
        public async Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            await Task.Run(() =>
            {
                try
                {
                    var user = _db.Single<User>(u => u.Username == context.UserName);
                    if (user != null)
                    {
                        if (BCrypt.Net.BCrypt.Verify(context.Password, user.Password))
                        {
                            context.Result = new GrantValidationResult(
                                subject: user.Id,
                                authenticationMethod: "custom",
                                claims: UserHelper.GetUserClaims(user, _db));

                            return;
                        }

                        context.Result =
                            new GrantValidationResult(TokenRequestErrors.InvalidGrant, "Incorrect password");
                        return;
                    }
                    context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, "User does not exist.");
                }
                catch (Exception ex)
                {
                    context.Result =
                        new GrantValidationResult(TokenRequestErrors.InvalidGrant, "Invalid username or password");
                }
            });
        }
        
      
    }
}