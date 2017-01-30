using AspNet.Identity.MongoDB;
using getAmbulance.App_Start;
using getAmbulance.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using static getAmbulance.Client.ClientModel;

namespace getAmbulance
{
    public class AuthRepository : IDisposable
    {
        private ApplicationIdentityContext _ctx;

        private UserManager<ApplicationUser> _userManager;
        private UserManager<ApplicationClientUser> _ciientUserManager;
        private ApplicationClientUserManager _clientUserManager= HttpContext.Current.GetOwinContext().GetUserManager<ApplicationClientUserManager>();
        public ApplicationClientUserManager UserManager2
        {

            get
            {
                return _clientUserManager ?? HttpContext.Current.GetOwinContext().GetUserManager<ApplicationClientUserManager>();
            }
            private set
            {
                _clientUserManager = value;
            }
        }

        public AuthRepository()
        {
            _ctx = ApplicationIdentityContext.Create();
            _userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(_ctx.Users));
            _ciientUserManager = new UserManager<ApplicationClientUser>(new UserStore<ApplicationClientUser>(_ctx.ClientUsers));

            
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


        public async Task<bool> IsPhoneNumberConfirmed(string userName,string code)
        {

            var builder = Builders<ApplicationClientUser>.Filter;

            var filter = builder.Eq("UserName", userName);
            var user = _ctx.ClientUsers.Find(filter).ToListAsync().Result[0];
            var codeVerfied = await _clientUserManager.VerifyTwoFactorTokenAsync(user.Id, "PhoneCode", code);
            codeVerfied = true;
            if (codeVerfied)
            {
                var update = Builders<ApplicationClientUser>.Update
                    .Set("PhoneNumberConfirmed", true);
                var result = _ctx.ClientUsers.UpdateOneAsync(filter, update);
            }
        //    var isPhoneConfirmed=await _ciientUserManager.IsPhoneNumberConfirmedAsync(user.Id);
                 return codeVerfied;
           
        }

        public BrowserClient FindClient(string clientId)
        {

           var filter = Builders<BrowserClient>.Filter.Eq("Type", clientId);
           var client = _ctx.BrowserClients.Find(filter).ToListAsync().Result[0];
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