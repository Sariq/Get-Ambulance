using getAmbulance.Models;
using getAmbulance.Reservation;
using MongoDB.Bson;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using static getAmbulance.WhiteLabel.WhiteLabelModel;

namespace getAmbulance.WhiteLabel
{
    public class WhiteLabelController : ApiController
    {
        private ApplicationIdentityContext _ctx;
        private ReservationService _reservationService;

        private WhiteLabelService _whiteLabelService;


        public WhiteLabelController()
        {
            _ctx = ApplicationIdentityContext.Create();
            _reservationService = new ReservationService();
            _whiteLabelService = new WhiteLabelService();

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

                response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "GetReservationsListByWhiteLabelId Add Error");
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

    }
}
