using System;
using System.Threading.Tasks;
using IdentityServer4.Models;
using IdentityServer4.Validation;
using STS.Helpers;
using STS.Interface;
using STS.Models;

namespace STS.Utils
{
    public class CustomResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
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
                    var user = _db.Single<Models.User>(u =>
                        string.Equals(u.Username, context.UserName, StringComparison.CurrentCultureIgnoreCase));
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
                catch (Exception)
                {
                    context.Result =
                        new GrantValidationResult(TokenRequestErrors.InvalidGrant, "Invalid username or password");
                }
            });
        }
    }
}