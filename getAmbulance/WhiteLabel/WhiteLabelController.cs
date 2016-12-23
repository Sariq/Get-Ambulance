using getAmbulance.Helpers;
using getAmbulance.Models;
using getAmbulance.Reservation;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using static getAmbulance.WhiteLabel.WhiteLabelModel;

namespace getAmbulance.WhiteLabel
{
    public class WhiteLabelController : ApiController
    {
        private ApplicationIdentityContext _ctx;
        private ReservationService _reservationService;
        private WhiteLabelService _whiteLabelService;
        private HelperService _HelperService;

        public WhiteLabelController()
        {
            _ctx = ApplicationIdentityContext.Create();
            _reservationService = new ReservationService();
            _whiteLabelService = new WhiteLabelService();
            _HelperService = new HelperService();
        }
        // Post: /WhiteLabel/UpdateWhiteLabelIsOnline
        [HttpPost]
        public HttpResponseMessage UpdateWhiteLabelIsOnline(JObject jsonData)
        {
            HttpResponseMessage response;
            try
            {
                dynamic jsonObj = jsonData;
                _whiteLabelService.UpdateWhiteLabelIsOnline(jsonObj.whiteLabelId.Value, jsonObj.isOnline.Value);
                response = Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {

                response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "AUpdateWhiteLabelIsOnline Error");
            }
            return response;
        }
        // Post: /WhiteLabel/GetWhiteLabelById
        [HttpPost]
        public HttpResponseMessage GetWhiteLabelById(string whiteLabelId)
        {
            HttpResponseMessage response;
            try
            {
                WhiteLabelEntity whiteLabel = _whiteLabelService.GetWhiteLabelById(whiteLabelId);

                response = Request.CreateResponse(HttpStatusCode.OK, whiteLabel);
            }
            catch (Exception ex)
            {

                response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "GetWhiteLabelById  Error");
            }
            return response;
        }
        // Post: /WhiteLabel/UpdatePricesByCategory
        [HttpPost]
        public HttpResponseMessage UpdatePricesByCategory(JObject jsonData)
        {
            HttpResponseMessage response;
            try
            {
                dynamic jsonObj = jsonData;
                BsonDocument doc = BsonDocument.Parse(jsonData.ToString());
                _whiteLabelService.UpdatePricesByCategory(doc);

                response = Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {

                response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "UpdatePricesByCategory Error");
            }
            return response;
        }


        //
        // Post: /WhiteLabel/GetWhiteLabelData
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage GetWhiteLabelData(JObject jsonData)
        {
            HttpResponseMessage response;
            dynamic jsonObj = jsonData;
            // var currentPlace = jsonObj.currentPlace.Value;
            //temp_applicationUser.Claims
            var builder = Builders<ApplicationUser>.Filter;
            var filter = builder.Eq("UserName", (string)jsonObj.userName.Value);
            var temp_userData = _ctx.Users.Find(filter).ToListAsync().Result[0];
            var WhiteLabelId = _HelperService.GetValueByTypeFromClaims(temp_userData.Claims, "WhiteLabelId").Value;
            WhiteLabelEntity whiteLabel = _whiteLabelService.GetWhiteLabelById(WhiteLabelId.ToString());
            WhiteLabelResponseEntity whiteLabelResponse = new WhiteLabelResponseEntity();
            whiteLabelResponse.prices = JObject.Parse(whiteLabel.prices.ToJson<MongoDB.Bson.BsonDocument>());
            whiteLabelResponse.whiteLabelid = WhiteLabelId;
            whiteLabelResponse.users = JObject.Parse(whiteLabel.users.ToJson<MongoDB.Bson.BsonDocument>());
            whiteLabelResponse._id = whiteLabel._id;
            whiteLabelResponse.isOnline = whiteLabel.isOnline;
            whiteLabelResponse.logo= whiteLabel.logo;
            whiteLabelResponse.supportedServices = whiteLabel.supportedServices;
            
            //List<IdentityUserClaim> userData = temp_userData.Claims;
            //return userData;
            response = Request.CreateResponse(HttpStatusCode.OK, whiteLabelResponse);
            return response;
        }


        // Post: /WhiteLabel/AddSupportedAreas
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage AddSupportedAreas(JObject jsonData)
        {
            HttpResponseMessage response;


            dynamic jsonObj = jsonData;
            List<SupportedArea> supportedAreaList = jsonObj.supportedAreaList.ToObject<List<SupportedArea>>();

            _whiteLabelService.AddSupportedAreas(jsonObj.whiteLabelId.Value, supportedAreaList);

            response = Request.CreateResponse(HttpStatusCode.OK);
            return response;
        }



    }
}
