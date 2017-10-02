using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Newtonsoft.Json;
using STS.Interface;

namespace STS.User
{
    public class ProfileService : IProfileService
    {
        private readonly IRepository _db;

        public ProfileService(IRepository db)
        {
            _db = db;
        }

        public Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            return Task.Run(() =>
            {
                try
                {
                    if (!string.IsNullOrEmpty(context.Subject.Identity.Name))
                    {
                        var user = _db.Single<User>(u => context.Subject.Identity.Name == u.Username);

                        if (user == null) return;
                        var claims = UserHelper.GetUserClaims(user, _db);

                        context.IssuedClaims =
                            claims.Where(x => context.RequestedClaimTypes.Contains(x.Type)).ToList();
                    }
                    else
                    {
                        var userId = context.Subject.Claims.FirstOrDefault(x => x.Type == "sub");

                        if (userId != null && !string.IsNullOrEmpty(userId.Value))
                        {
                            var user = _db.Single<User>(u => u.Id == userId.Value);

                            if (user != null)
                            {
                                var claims = UserHelper.GetUserClaims(user, _db);

                                context.IssuedClaims = claims.ToList();
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                }
            });
        }

        public Task IsActiveAsync(IsActiveContext context)
        {
            return Task.Run(() =>
            {
                try
                {
                    var userId = context.Subject.Claims.FirstOrDefault(x => x.Type == "user_id");

                    if (userId == null || string.IsNullOrEmpty(userId.Value)) return;
                    var user = _db.Single<User>(u => u.Id == userId.Value);

                    if (user == null) return;
                    if (user.IsActive)
                    {
                        context.IsActive = user.IsActive;
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                }
            });
        }
    }
}