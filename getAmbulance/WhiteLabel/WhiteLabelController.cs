using getAmbulance.Helpers;
using getAmbulance.Models;
using getAmbulance.Reservation;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web;
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
               _whiteLabelService.UpdateWhiteLabelIsOnline(jsonObj.whiteLabelId.Value, jsonObj.isOnline.Value,jsonObj.type.Value);
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
        public HttpResponseMessage GetWhiteLabelById(JObject jsonData)
        {
            HttpResponseMessage response;
            try
            {
                dynamic jsonObj = jsonData;

                WhiteLabelEntity whiteLabel = _whiteLabelService.GetWhiteLabelById(jsonObj.whiteLabelId.Value);

                response = Request.CreateResponse(HttpStatusCode.OK, whiteLabel);
            }
            catch (Exception ex)
            {

                response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "GetWhiteLabelById  Error");
            }
            return response;
        }
        // Post: /WhiteLabel/GetWhiteLabelsList
        [HttpPost]
        public HttpResponseMessage GetWhiteLabelsList()
        {
            HttpResponseMessage response;
            try
            {
                List<WhiteLabelEntity> whiteLabelsList = _whiteLabelService.GetWhiteLabelsList();
                List<WhiteLabelBasicDataModel> whiteLabelsBasicDataList = _whiteLabelService.GetWhiteLabelsBasicDataList(whiteLabelsList);
                response = Request.CreateResponse(HttpStatusCode.OK, whiteLabelsBasicDataList);
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
        // Post: /WhiteLabel/DeletePricesByCategory
        [HttpPost]
        public HttpResponseMessage DeletePricesByCategory(JObject jsonData)
        {
            HttpResponseMessage response;
            try
            {
                dynamic jsonObj = jsonData;
                BsonDocument doc = BsonDocument.Parse(jsonData.ToString());
                _whiteLabelService.DeletePricesByCategory(doc);

                response = Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {

                response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "UpdatePricesByCategory Error");
            }
            return response;
        }

        

        // Post: /WhiteLabel/UpdateAmbulancePrices
        [HttpPost]
        public HttpResponseMessage UpdateAmbulancePrices(JObject jsonData)
        {
            HttpResponseMessage response;
            try
            {
                dynamic jsonObj = jsonData;
                BsonDocument doc = BsonDocument.Parse(jsonData.ToString());
                _whiteLabelService.UpdateAmbulancePrices(doc);
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
            string WhiteLabelId = null;
            if (jsonObj.userName != null)
            {
                var builder = Builders<ApplicationUser>.Filter;
                var filter = builder.Eq("UserName", (string)jsonObj.userName.Value);
                var temp_userData = _ctx.Users.Find(filter).ToListAsync().Result[0];
                WhiteLabelId = temp_userData.WhiteLabelId;// _HelperService.GetValueByTypeFromClaims(temp_userData.Claims, "WhiteLabelId").Value;

            }
            else
            {
                if (jsonObj.whiteLabelId != null)
                {
                    WhiteLabelId = (string)jsonObj.whiteLabelId.Value;

                }
            }

            WhiteLabelEntity whiteLabel = _whiteLabelService.GetWhiteLabelById(WhiteLabelId.ToString());
            WhiteLabelResponseEntity whiteLabelResponse = new WhiteLabelResponseEntity();
            whiteLabelResponse.name = whiteLabel.name;
            whiteLabelResponse.whiteLabelid = WhiteLabelId;
            whiteLabelResponse.users = whiteLabel.users;
            whiteLabelResponse._id = whiteLabel._id;
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

            _whiteLabelService.AddSupportedAreas(jsonObj.whiteLabelId.Value, supportedAreaList, jsonObj.type.Value);

            response = Request.CreateResponse(HttpStatusCode.OK);
            return response;
        }

        // Post: /WhiteLabel/AddSupportedServices
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage AddSupportedServices(JObject jsonData)
        {
            HttpResponseMessage response;
            dynamic jsonObj = jsonData;
            List<SupportedService> supportedServiceList = jsonObj.supportedServiceList.ToObject<List<SupportedService>>();
            _whiteLabelService.AddSupportedServices(jsonObj.whiteLabelId.Value, supportedServiceList, jsonObj.type.Value);
            response = Request.CreateResponse(HttpStatusCode.OK);
            return response;
        }
        
        // Post: /WhiteLabel/UpdateSupportedAreas
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage UpdateSupportedAreas(JObject jsonData)
        {
            HttpResponseMessage response;


            dynamic jsonObj = jsonData;
            List<SupportedArea> supportedAreaList = jsonObj.supportedAreaList.ToObject<List<SupportedArea>>();

            _whiteLabelService.UpdateSupportedAreas(jsonObj.whiteLabelId.Value, supportedAreaList, jsonObj.type.Value, jsonObj.index.Value);

            response = Request.CreateResponse(HttpStatusCode.OK);
            return response;
        }
        // Post: /WhiteLabel/DeleteSupportedAreas
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage DeleteSupportedAreas(JObject jsonData)
        {
            HttpResponseMessage response;


            dynamic jsonObj = jsonData;
            List<SupportedArea> supportedAreaList = jsonObj.supportedAreaList.ToObject<List<SupportedArea>>();

            _whiteLabelService.DeleteSupportedAreas(jsonObj.whiteLabelId.Value, supportedAreaList, jsonObj.type.Value);

            response = Request.CreateResponse(HttpStatusCode.OK);
            return response;
        }

        // Post: /WhiteLabel/DeleteSupportedServices
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage DeleteSupportedServices(JObject jsonData)
        {
            HttpResponseMessage response;
            dynamic jsonObj = jsonData;
            List<SupportedService> supportedServiceList = jsonObj.supportedServiceList.ToObject<List<SupportedService>>();
            _whiteLabelService.DeleteSupportedServices(jsonObj.whiteLabelId.Value, supportedServiceList, jsonObj.type.Value);
            response = Request.CreateResponse(HttpStatusCode.OK);
            return response;
        }


        // Post: /WhiteLabel/AddWhiteLabel
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage AddWhiteLabel(WhiteLabelEntity whiteLabel)
        {
            HttpResponseMessage response;
            WhiteLabelEntity WLEntity =_whiteLabelService.FindWLByName(whiteLabel.name);
            if (WLEntity != null)
            {
               response = Request.CreateResponse(HttpStatusCode.BadRequest, eWLError.WlAlreadyExist);
            }else
            {
                WhiteLabelEntity resWhiteLabel = _whiteLabelService.AddWhiteLabel(whiteLabel);
                response = Request.CreateResponse(HttpStatusCode.OK, resWhiteLabel);
            }
           
            return response;
        }


        // Post: /WhiteLabel/UploadWhiteLabelLogo
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage UploadWhiteLabelLogo()
        {
            HttpResponseMessage result = null;
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                var docfiles = new List<string>();
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    string Parent = new DirectoryInfo(HttpContext.Current.Server.MapPath("~/")).Parent.FullName;
                    string wlId = httpRequest.Headers["WLId"];
                    _whiteLabelService.UploadWhiteLabelLogoName(wlId, Parent);

                    var filePath = Parent + "/img/"+ postedFile.FileName;
                    postedFile.SaveAs(filePath);
                    docfiles.Add(filePath);
                    _whiteLabelService.UploadWhiteLabelLogoName(wlId, postedFile.FileName);
                }
                result = Request.CreateResponse(HttpStatusCode.Created, docfiles);
            }
            else
            {
                result = Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            return result;
        }
        


    }
}
