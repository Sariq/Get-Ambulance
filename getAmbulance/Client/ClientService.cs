using AspNet.Identity.MongoDB;
using getAmbulance.Helpers;
using getAmbulance.Models;
using MongoDB.Bson;
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

        private HelperService _HelperService;
        public ClientService()
        {
            _HelperService = new HelperService();
        }
        
        public ClientUserProfileEntity CreateClientUserProfile(ApplicationUser clientUser)
        {
            
            ClientUserProfileEntity clientUserProfile = new ClientUserProfileEntity();
            clientUserProfile.Email = clientUser.Email;
            clientUserProfile.User_Name = clientUser.UserName;
            clientUserProfile.Full_Name=_HelperService.GetValueByTypeFromClaims(clientUser.Claims, "Full_Name").Value;
            clientUserProfile.Id_Number = _HelperService.GetValueByTypeFromClaims(clientUser.Claims, "Id_Number").Value;
            clientUserProfile.Phone_Number = _HelperService.GetValueByTypeFromClaims(clientUser.Claims, "Phone_Number").Value;
            clientUserProfile.Age = _HelperService.GetValueByTypeFromClaims(clientUser.Claims, "Age").Value;
            return clientUserProfile;
        }
    }
}