using AspNet.Identity.MongoDB;
using getAmbulance.Helpers;
using getAmbulance.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using static getAmbulance.Client.ClientModel;

namespace getAmbulance.Client
{
    public class ClientService
    {
        private ApplicationIdentityContext _ctx;
        private HelperService _HelperService;
        public ClientService()
        {
            _ctx = ApplicationIdentityContext.Create();
            _HelperService = new HelperService();
        }
        
        public ClientUserProfileEntity CreateClientUserProfile(ApplicationClientUser clientUser)
        {
              

            ClientUserProfileEntity clientUserProfile = new ClientUserProfileEntity();
           // clientUserProfile.Email = clientUser.Email;
            clientUserProfile.User_Name = clientUser.UserName;
            clientUserProfile.Full_Name= clientUser.Full_Name;
            clientUserProfile.Id_Number = clientUser.ID_Number;
            clientUserProfile.Phone_Number = clientUser.PhoneNumber;

            return clientUserProfile;
        }

        public ApplicationClientUser GetClientByUserName(string userName)
        {

            var builder = Builders<ApplicationClientUser>.Filter;
            var filter = builder.Eq("UserName", userName);
            var user = _ctx.ClientUsers.Find(filter).FirstOrDefault();

            return user;
        }
    }
}