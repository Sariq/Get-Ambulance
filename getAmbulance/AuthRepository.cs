using AspNet.Identity.MongoDB;
using getAmbulance.Models;
using Microsoft.AspNet.Identity;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;


namespace getAmbulance
{
    public class AuthRepository : IDisposable
    {
        private ApplicationIdentityContext _ctx;

        private UserManager<ApplicationUser> _userManager;
    

        public AuthRepository()
        {
            _ctx = ApplicationIdentityContext.Create();
            _userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(_ctx.Users));
            
        }

        public async void RegisterUser(RegisterViewModel userModel)
        {
            ApplicationUser user = new ApplicationUser
            {
                UserName = userModel.Email
            };

            var result = await _userManager.CreateAsync(user, userModel.Password);

            
        }

        public async Task<IdentityUser> FindUser(string userName, string password)
        {
            IdentityUser user = await _userManager.FindAsync(userName, password);

            return user;
        }

        public BrowserClient FindClient(string clientId)
        {
           // var client = _ctx.Clients.Find(clientId);




            var filter = Builders<BrowserClient>.Filter.Eq("Type", "ngAuthApp");
            var client = _ctx.BrowserClients.Find(filter).ToListAsync().Result[0];
            //var result2= result.Result.ToJson();
            return client;
        }

        public void Dispose()
        {
            _ctx.Dispose();
            _userManager.Dispose();

        }
        public async Task<bool> AddRefreshToken(RefreshToken token)
        {

            //RemoveRefreshToken
            var builder = Builders<RefreshToken>.Filter;
            var filter = builder.Eq("Subject", token.Subject) & builder.Eq("ClientId", token.ClientId);
            var existingToken = _ctx.RefreshTokens.FindOneAndDeleteAsync(filter);
         
            await _ctx.RefreshTokens.InsertOneAsync(token);
            return true;

        }


        //public async Task<bool> RemoveRefreshToken(RefreshToken refreshToken)
        //{
        //    _ctx.RefreshTokens.Remove(refreshToken);
        //    return await _ctx.SaveChangesAsync() > 0;
        //}
        public async Task<bool> RemoveRefreshToken(string refreshTokenId)
        {
            var builder = Builders<RefreshToken>.Filter;
            var filter = builder.Eq("_Id", refreshTokenId);
            var existingToken = _ctx.RefreshTokens.FindOneAndDeleteAsync(filter);

            return false;
        }

        public RefreshToken FindRefreshToken(string refreshTokenId)
        {
            
            
                var builder = Builders<RefreshToken>.Filter;
                var filter = builder.Eq("_Id", refreshTokenId);
                 var refreshToken = _ctx.RefreshTokens.Find(filter).ToListAsync();
            if (refreshToken.Result.Count>0)
            {
                return refreshToken.Result[0];
            }
                return null;
            }
           

        
     

        //public List<RefreshToken> GetAllRefreshTokens()
        //{
        //    return _ctx.RefreshTokens.ToList();
        //}

    }
}