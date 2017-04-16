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
            clientUserProfile.Id_Number = clientUser.Id_Number;
            clientUserProfile.Phone_Number = clientUser.PhoneNumber;
            clientUserProfile.Date_Of_Birth = clientUser.Date_Of_Birth;

            clientUserProfile._id=clientUser.Id;

            return clientUserProfile;
        }

        public ApplicationClientUser GetClientByUserName(string userName)
        {

            var builder = Builders<ApplicationClientUser>.Filter;
            var filter = builder.Eq("UserName", userName);
            var user = _ctx.ClientUsers.Find(filter).FirstOrDefault();

            return user;
        }

        public void UpdateUserProfile(UpdateUserProfileModel userProfileData)
        {
            var id = new ObjectId(userProfileData.User_Id);
            var filter = Builders<ApplicationClientUser>.Filter.Eq("_id", id);
            if (userProfileData.Full_Name != null)
            {
                var update = Builders<ApplicationClientUser>.Update
                         .Set("Full_Name", userProfileData.Full_Name);
                _ctx.ClientUsers.UpdateOneAsync(filter, update); ;
            }
            if (userProfileData.Id_Number != null)
            {
                var update = Builders<ApplicationClientUser>.Update
                         .Set("Id_Number", userProfileData.Id_Number);
                _ctx.ClientUsers.UpdateOneAsync(filter, update); ;
            }
            if (userProfileData.Date_Of_Birth != null)
            {
                var update = Builders<ApplicationClientUser>.Update
                         .Set("Date_Of_Birth", userProfileData.Date_Of_Birth);
                _ctx.ClientUsers.UpdateOneAsync(filter, update); ;
            }

        }

        public ClientBasicInfo GetClientBasicInfoById(string UserId)
        {
            var id = new ObjectId(UserId);
            var builder = Builders<ApplicationClientUser>.Filter;
            var filter = builder.Eq("_id", id);
            var user = _ctx.ClientUsers.Find(filter).FirstOrDefault();
            ClientBasicInfo clientBasicInfo = new ClientBasicInfo();
            clientBasicInfo.Full_Name = user.Full_Name;
            clientBasicInfo.Id_Number = user.Id_Number;
            clientBasicInfo.Phone_Number = user.UserName;
            clientBasicInfo.DateOfBirth=user.Date_Of_Birth;
            return clientBasicInfo;
        }


    }
}