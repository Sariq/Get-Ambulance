using getAmbulance.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using static getAmbulance.Client.ClientModel;

namespace getAmbulance.Client
{
    public class ClientController : ApiController
    {

        private ApplicationIdentityContext _ctx;
        private ClientService _ClientService;
        public ClientController()
        {
            _ctx = ApplicationIdentityContext.Create();
            _ClientService = new ClientService();
        }
        // Post: /Account/GetUserProfile
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage GetUserProfile(JObject jsonData)
        {
            HttpResponseMessage response;
            dynamic jsonObj = jsonData;
            var builder = Builders<ApplicationClientUser>.Filter;
            var filter = builder.Eq("UserName", (string)jsonObj.userName.Value);
            var temp_userData = _ctx.ClientUsers.Find(filter).ToListAsync().Result[0];
            var clientUser = _ClientService.CreateClientUserProfile(temp_userData);
            response = Request.CreateResponse(HttpStatusCode.OK, clientUser);
            return response;
        }
        // Post: /Account/GetClientBasicInfoById
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage GetClientBasicInfoById(JObject jsonData)
        {
            HttpResponseMessage response;
            dynamic jsonObj = jsonData;
            var clientUser = _ClientService.GetClientBasicInfoById((string)jsonObj.UserId.Value);
            response = Request.CreateResponse(HttpStatusCode.OK, clientUser);
            return response;
        }
        // Post: /Account/UpdateUserProfile
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage UpdateUserProfile(UpdateUserProfileModel userProfileData)
        {
            HttpResponseMessage response;
            _ClientService.UpdateUserProfile(userProfileData);
            response = Request.CreateResponse(HttpStatusCode.OK);
            return response;
        }
    }
}
