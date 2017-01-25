using getAmbulance.Hubs;
using getAmbulance.Models;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.OData;
using System.Web.Http.Cors;
using static getAmbulance.WhiteLabel.WhiteLabelModel;

namespace getAmbulance.Reservation
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [System.Web.Http.Authorize]
    public class ReservationController :ApiController
    {
        private ApplicationIdentityContext _ctx;
        private ReservationService _reservationService;
     


        public ReservationController()
        {
            _ctx = ApplicationIdentityContext.Create();
            _reservationService = new ReservationService();
           

        }
        Lazy<IHubContext> hub = new Lazy<IHubContext>(
      () => GlobalHost.ConnectionManager.GetHubContext<ReservationHub>()
    );
        protected IHubContext Hub
        {
            get { return hub.Value; }
        }

        // POST: /Reservation/Add
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage AddReservation(JObject jsonData)
        {
            var reservation = new ReservationEntity();

            HttpResponseMessage response;
            try
            {
                
                dynamic jsonObj = jsonData;
                reservation.WhiteLabel_ID = jsonObj.WhiteLabel_ID.Value;
                reservation.Client_ID = jsonObj.Client_ID.Value;
                reservation.Price = (int)jsonObj.Price.Value;
                reservation.Type = jsonObj.Type.Value;
                reservation.Status= jsonObj.Status.Value;
                reservation.Full_Name= jsonObj.Full_Name.Value;
                reservation.Phone_Number = jsonObj.Phone_Number.Value;
                reservation.Age = jsonObj.Age.Value;
                reservation.Id_Number = jsonObj.Id_Number.Value;
                reservation.AdditionalProperties = _reservationService.ConvertJsonAdditionalProperties(jsonObj);

                Hub.Clients.Group(reservation.WhiteLabel_ID.ToString()).addReservation(reservation);
                Hub.Clients.Group("0").addReservation(reservation);
                // Hub.Clients.All.addReservation(reservation);
                ReservationEntity completedReservation= _reservationService.AddReservation(reservation);
                response = Request.CreateResponse(HttpStatusCode.OK, completedReservation);
            }
            catch (Exception ex)
            {
                response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "GetTYPAccountInfo Error");
            }
            return response;
        }
        //// POST: /Reservation/Add
        //[HttpPost]
        //[AllowAnonymous]
        //public HttpResponseMessage AddReservation(ReservationEntity reservation)
        //{
        //    HttpResponseMessage response;
        //    try
        //    {
        //        Hub.Clients.Group(reservation.WhiteLabel_ID.ToString()).addReservation(reservation);
        //       // Hub.Clients.All.addReservation(reservation);
        //        _reservationService.AddReservation(reservation);
        //        response = Request.CreateResponse(HttpStatusCode.OK);
        //    }
        //    catch (Exception ex)
        //    {
        //        response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "GetTYPAccountInfo Error");
        //    }
        //    return response;
        //}

        // Post: /Reservation/GetReservationsListByWhiteLabelId
        [HttpPost]
        public HttpResponseMessage GetReservationsListByWhiteLabelId(JObject jsonData)
        {
            HttpResponseMessage response;
            string reservationStatus = "0";
            string reservationType = "0";
            
            int whiteLabelId = 0;
            try
            {
                dynamic jsonObj = jsonData;
                if (jsonObj.status == null)
                {
                    reservationStatus = "0";
                }
                else
                {
                    reservationStatus = jsonObj.status.Value;
                }
                if (jsonObj.type == null)
                {
                    reservationType = "0";
                }
                else
                {
                    reservationType = jsonObj.type.Value;
                }

                List<ReservationEntity> reservationList = _reservationService.GetReservationsListByWhiteLabelId(jsonObj.whiteLabelId.Value.ToString(), reservationStatus, reservationType);
                
                response = Request.CreateResponse(HttpStatusCode.OK, reservationList);
            }
            catch (Exception ex)
            {

                response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "GetReservationsListByWhiteLabelId Add Error");
            }
            return response;
        }
        
        // Post: /Reservation/GetReservationsListByWhiteLabelId
        [HttpPost]
        public HttpResponseMessage GetReservationsListByClientId(JObject jsonData)
        {
            HttpResponseMessage response;
            string reservationStatus = "0";
            string reservationType = "0";

            int ClientId = 0;
            try
            {
                dynamic jsonObj = jsonData;
                if (jsonObj.status == null)
                {
                    reservationStatus = "0";
                }
                else
                {
                    reservationStatus = jsonObj.status.Value;
                }
                if (jsonObj.type == null)
                {
                    reservationType = "0";
                }
                else
                {
                    reservationType = jsonObj.type.Value;
                }

                List<ReservationEntity> reservationList = _reservationService.GetReservationsListByClientId(jsonObj.ClientId.Value.ToString(), reservationStatus, reservationType);

                response = Request.CreateResponse(HttpStatusCode.OK, reservationList);
            }
            catch (Exception ex)
            {

                response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "GetReservationsListByClientId Add Error");
            }
            return response;
        }
        // Get: /Reservation/GetReservationsList
        [AllowAnonymous]
        public HttpResponseMessage GetReservationsList()
        {
            HttpResponseMessage response;
            try
            {
                List<ReservationEntity> reservationList = _reservationService.GetReservationsList();
                response = Request.CreateResponse(HttpStatusCode.OK, reservationList);
            }
            catch (Exception ex)
            {
                response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "GetTYPAccountInfo Error");
            }
            return response;
        }
        // Post: /Reservation/GetAmbulanceOffersList
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage GetAmbulanceOffersList(JObject jsonData)
        {
            HttpResponseMessage response;
            dynamic jsonObj = jsonData;
          
            try
            {
                List<WhiteLabelOfferEntity> whiteLabelsOfferList=_reservationService.GetAmbulanceOffersList(jsonObj);
                response = Request.CreateResponse(HttpStatusCode.OK, whiteLabelsOfferList);
            }
            catch (Exception ex)
            {
                response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "GetAmbulanceOffersList Error");
            }
            return response;
        }

        // Post: /Reservation/GetAmbulanceOffersList
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage GetMedicalTherapistOffersList(JObject jsonData)
        {
            HttpResponseMessage response;
            dynamic jsonObj = jsonData;

            try
            {
                List<WhiteLabelOfferEntity> whiteLabelsOfferList = _reservationService.GetMedicalTherapistOffersList(jsonObj);
                response = Request.CreateResponse(HttpStatusCode.OK, whiteLabelsOfferList);
            }
            catch (Exception ex)
            {
                response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "GetAmbulanceOffersList Error");
            }
            return response;
        }

        // Post: /Reservation/GetStairsAssistanceOffersList
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage GetStairsAssistanceOffersList(JObject jsonData)
        {
            HttpResponseMessage response;
            dynamic jsonObj = jsonData;

            try
            {
                List<WhiteLabelOfferEntity> whiteLabelsOfferList = _reservationService.GetStairsAssistanceOffersList(jsonObj);
                response = Request.CreateResponse(HttpStatusCode.OK, whiteLabelsOfferList);
            }
            catch (Exception ex)
            {
                response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "GetStairsAssistanceOffersList Error");
            }
            return response;
        }
        // Post: /Reservation/UpdateReservationStatus
        [HttpPost]
        public HttpResponseMessage UpdateReservationStatus(JObject jsonData)
        {
            HttpResponseMessage response;
            try
            {
                dynamic jsonObj = jsonData;
                _reservationService.UpdateReservationStatus(jsonObj.reservationId.Value, jsonObj.Status.Value);
                _reservationService.HubUpdateClient(jsonObj.Client_Id.Value, jsonObj.whiteLabelId.Value, jsonObj.reservationId.Value, jsonObj.Status.Value);

                response = Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {

                response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "AcceptReservation Add Error");
            }
            return response;
        }


        // Post: /Reservation/AcceptReservation
        [HttpPost]
        public HttpResponseMessage AcceptReservation(JObject jsonData)
        {
            HttpResponseMessage response;
            try
            {
                dynamic jsonObj = jsonData;
                _reservationService.AcceptReservation(jsonObj.reservationId.Value);

                  Hub.Clients.Group(jsonObj.Client_Id.Value).reservationAccepted(jsonObj.reservationId.Value);

                response = Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {

                response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "AcceptReservation Add Error");
            }
            return response;
        }
        // Post: /Reservation/GetReservationById
        [HttpPost]
        public HttpResponseMessage GetReservationById(JObject jsonData)
        {
            HttpResponseMessage response;
            try
            {
                dynamic jsonObj = jsonData;

                ReservationEntity reservation = _reservationService.GetReservationById(jsonObj.reservationId.Value);

                response = Request.CreateResponse(HttpStatusCode.OK, reservation);
            }
            catch (Exception ex)
            {

                response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "GetReservationsListByWhiteLabelId Add Error");
            }
            return response;
        }
    }
}