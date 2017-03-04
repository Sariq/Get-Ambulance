using getAmbulance.DB;
using getAmbulance.Enums;
using getAmbulance.Hubs;
using getAmbulance.Interfaces;
using getAmbulance.Models;
using getAmbulance.WhiteLabel;
using Microsoft.AspNet.SignalR;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Device.Location;
using System.Linq;
using System.Web;
using static getAmbulance.WhiteLabel.WhiteLabelModel;


namespace getAmbulance.Reservation
{
    public class ReservationService
    {
        private ApplicationIdentityContext _ctx;
        private WhiteLabelService _whiteLabelService;
        private DBService _dbSerivce;
        public ReservationService()
        {
            _ctx = ApplicationIdentityContext.Create();
            _whiteLabelService = new WhiteLabelService();
            _dbSerivce = new DBService();
        }

        Lazy<IHubContext> hub = new Lazy<IHubContext>(
() => GlobalHost.ConnectionManager.GetHubContext<ReservationHub>()
);
        protected IHubContext Hub
        {
            get { return hub.Value; }
        }

        public ReservationEntity AddReservation(ReservationEntity reservation)
        {
            try
            {
                int reservationNumber = _dbSerivce.getNextSequence("Reservation_Number");
                reservation.Reservation_Number = reservationNumber;
                _ctx.Reservations.InsertOneAsync(reservation);

            }
            catch (Exception ex)
            {

            }
            return reservation;
        }
        public ReservationEntity UpdateReservation(ReservationEntity reservation)
        {
            try
            {

                UpdateReservationWLId(reservation._id.ToString(), reservation.WhiteLabel_ID);
                UpdateReservationStatus(reservation._id.ToString(), reservation.Status);
                UpdateReservationDateToNow(reservation._id.ToString());
                HubUpdateWLAndClientReservationStatus(reservation.Client_ID, reservation.WhiteLabel_ID, reservation._id.ToString(), reservation.Status);

            }
            catch (Exception ex)
            {

            }
            return reservation;
        }
        public void UpdateReservationDateToNow(string reservationId)
        {
            var id = new ObjectId(reservationId);
            var filter = Builders<ReservationEntity>.Filter.Eq("_id", id);
            var update = Builders<ReservationEntity>.Update
                .Set("_date", DateTime.Now);

            var result = _ctx.Reservations.UpdateOneAsync(filter, update);
        }


        public List<ReservationEntity> GetReservationsList()
        {
            var reservationsList = _ctx.Reservations.Aggregate().ToListAsync().Result;
            return reservationsList;
        }

        public List<ReservationEntity> GetReservationsListByWhiteLabelId(string whiteLabel_ID, string reservationStatus = "0", string reservationType = "0")
        {
            var builder = Builders<ReservationEntity>.Filter;
            var filter = builder.Empty;
            if (whiteLabel_ID != "0")
            {
                filter = filter & builder.Eq("WhiteLabel_ID", whiteLabel_ID);
            }
            if (reservationStatus != "0")
            {
                filter = filter & builder.Eq("Status", reservationStatus);
            }
            if (reservationType != "0")
            {
                filter = filter & builder.Eq("Type", reservationType);
            }
            filter = filter & builder.Not(builder.Eq("Status", "3"));
            var reservationsList = _ctx.Reservations.Find(filter).ToListAsync().Result;
            reservationsList = hideClientInformation(reservationsList);
            return reservationsList;
        }
        public List<ReservationEntity> GetReservationsListByWhiteLabelIdByStatusByType(string whiteLabel_ID, dynamic statusArray, dynamic typeArray)
        {
            var builder = Builders<ReservationEntity>.Filter;
            var filter = builder.Empty;
            if (whiteLabel_ID != "0")
            {
                filter = filter & builder.Eq("WhiteLabel_ID", whiteLabel_ID);
            }
            if (statusArray != null && statusArray.Count > 0)
            {
                var statusFilter = builder.Empty;
                statusFilter = builder.Eq("Status", statusArray[0].Value);
                for (int i = 1; i <= statusArray.Count - 1; i++)
                {
                    statusFilter = statusFilter | builder.Eq("Status", statusArray[i].Value);

                }
                filter = filter & statusFilter;
            }
            if (typeArray != null && typeArray.Count > 0)
            {
                var typeFilter = builder.Empty;
                typeFilter = builder.Eq("Type", typeArray[0].Value);
                for (int i = 1; i <= typeArray.Count - 1; i++)
                {
                    typeFilter = typeFilter | builder.Eq("Type", typeArray[i].Value);

                }
                filter = filter & typeFilter;
            }


            var reservationsList = _ctx.Reservations.Find(filter).ToListAsync().Result;
            reservationsList = hideClientInformation(reservationsList);
            return reservationsList;
        }



        public List<ReservationEntity> GetReservationsListByClientId(string Client_ID, string reservationStatus = "0", string reservationType = "0")
        {
            var builder = Builders<ReservationEntity>.Filter;
            var filter = builder.Empty;
            if (Client_ID != "0")
            {
                filter = filter & builder.Eq("Client_ID", Client_ID);
            }
            if (reservationStatus != "0")
            {
                filter = filter & builder.Eq("Status", reservationStatus);
            }
            if (reservationType != "0")
            {
                filter = filter & builder.Eq("Type", reservationType);
            }
            var reservationsList = _ctx.Reservations.Find(filter).ToListAsync().Result;

            reservationsList = hideClientInformation(reservationsList);

            return reservationsList;
        }


        public List<ReservationEntity> hideClientInformation(List<ReservationEntity> reservationsList)
        {
            var temp_reservationsList = reservationsList;

            foreach (ReservationEntity reservation in temp_reservationsList)
            {
                if (reservation.Status == "1")
                {
                    //reservation.Reservation_Form.First_Name = null;
                    //reservation.Reservation_Form.Last_Name = null;
                    //reservation.Reservation_Form.Phone_Number = null;
                    //reservation.Reservation_Form.Id_Number = null;
                }
            }
            return temp_reservationsList;
        }
        public List<WhiteLabelOfferEntity> GetAmbulanceOffersList(dynamic jsonObj)
        {
            List<WhiteLabelOfferEntity> whiteLabelsOfferList = new List<WhiteLabelOfferEntity>();
            List<WhiteLabelEntity> whiteLabelsList = _whiteLabelService.GetWhiteLabelsListByStatusAndServiceSupport(true, "1");
            List<WhiteLabelEntity> filterdWhiteLabelLiset = _whiteLabelService.filterWhiteLabelListBySupportedArea(whiteLabelsList, jsonObj, "1");

            foreach (WhiteLabelEntity whiteLabel in filterdWhiteLabelLiset)
            {
                string Ambulance_Type = (jsonObj.form.Ambulance_Type).Value;
                string type = Ambulance_Type == "Private_Ambulance" ? "1" : "4";
                int distancePrice = getWhiteLabelDistancePriceByKM(whiteLabel, jsonObj, type);
                int extraServicesPrice = getAmbulanceExtraServicesPrice(whiteLabel, jsonObj.form, type);
                int finalPrice = distancePrice + extraServicesPrice;
                if (jsonObj.form["Direction_Type"] == "Two_Way")
                {
                    finalPrice = finalPrice * 2;
                }
                whiteLabelsOfferList.Add(new WhiteLabelOfferEntity(whiteLabel.whiteLabelid, whiteLabel.name, whiteLabel.logo, finalPrice));
            }
            return whiteLabelsOfferList;
        }

        public List<WhiteLabelOfferEntity> GetMedicalTherapistOffersList(dynamic jsonObj)
        {
            List<WhiteLabelOfferEntity> whiteLabelsOfferList = new List<WhiteLabelOfferEntity>();
            List<WhiteLabelEntity> whiteLabelsList = _whiteLabelService.GetWhiteLabelsListByStatusAndServiceSupport(true, "2");
            List<WhiteLabelEntity> filterdWhiteLabelLiset = _whiteLabelService.filterWhiteLabelListBySupportedArea(whiteLabelsList, jsonObj, "2");

            foreach (WhiteLabelEntity whiteLabel in filterdWhiteLabelLiset)
            {
                int extraServicesPrice = getMedicalTherapistPriceByHour(whiteLabel, jsonObj.form,"2");
                int finalPrice = extraServicesPrice;
                whiteLabelsOfferList.Add(new WhiteLabelOfferEntity(whiteLabel.whiteLabelid, whiteLabel.name, whiteLabel.logo, finalPrice));
            }
            return whiteLabelsOfferList;
        }

        public List<WhiteLabelOfferEntity> GetStairsAssistanceOffersList(dynamic jsonObj)
        {
            List<WhiteLabelOfferEntity> whiteLabelsOfferList = new List<WhiteLabelOfferEntity>();
            List<WhiteLabelEntity> whiteLabelsList = _whiteLabelService.GetWhiteLabelsListByStatusAndServiceSupport(true, "3");
            List<WhiteLabelEntity> filterdWhiteLabelLiset = _whiteLabelService.filterWhiteLabelListBySupportedArea(whiteLabelsList, jsonObj, "3");

            foreach (WhiteLabelEntity whiteLabel in filterdWhiteLabelLiset)
            {
                int extraServicesPrice = getStairsAssistancePriceByHour(whiteLabel, jsonObj.form,"3");
                int finalPrice = extraServicesPrice;
                whiteLabelsOfferList.Add(new WhiteLabelOfferEntity(whiteLabel.whiteLabelid, whiteLabel.name, whiteLabel.logo, finalPrice));
            }
            return whiteLabelsOfferList;
        }


        public bool isDay(string Time)
        {
            DateTime Reservation_Date = DateTime.Parse(Time);
            DateTime Day_End = DateTime.Parse("2012/12/12 18:00:00.000");
            DateTime Day_Start = DateTime.Parse("2012/12/12 06:00:00.000");

            if (Reservation_Date.TimeOfDay > Day_End.TimeOfDay || Reservation_Date.TimeOfDay < Day_Start.TimeOfDay)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        public int getWhiteLabelDistancePriceByKM(WhiteLabelEntity whiteLabel, dynamic jsonObj,string type)
        {

            SupportedService supportedService = whiteLabel.supportedServices.First(s => s.Type == type);
            dynamic temp_distancePricesList = supportedService.prices["distance"];
            string DayOrNight = null;
            if (isDay(jsonObj.form.Time.Value))
            {
                DayOrNight = "day";
            }
            else
            {
                DayOrNight = "night";
            }

           foreach (var distance in temp_distancePricesList)
            {

                if ((int)jsonObj.form.distance.Value <= distance["distance"])
                {
                    return (int)distance[DayOrNight];
                }

            }

            return ((temp_distancePricesList[temp_distancePricesList.Count - 1][DayOrNight].Value));
        }
        public int getAmbulanceExtraServicesPrice(WhiteLabelEntity whiteLabel, dynamic reservationData,string type)
        {
            SupportedService supportedService = whiteLabel.supportedServices.First(s => s.Type == type);
            int price = 0;
            foreach (var weightPrice in supportedService.prices["weight"])
            {
                if ((int)reservationData["Weight"] <= Int32.Parse(weightPrice.Name))
                {
                    price=(int)weightPrice.Value;
                    break;
                }
            }
  
            
            return price;
        }
        public int getStairsAssistanceExtraServicesPrice(WhiteLabelEntity whiteLabel, dynamic reservationData, string type)
        {
            SupportedService supportedService = whiteLabel.supportedServices.First(s => s.Type == type);
            foreach (var weightPrice in supportedService.prices["weight"])
            {
                if ((int)reservationData["Weight"] <= Int32.Parse(weightPrice.Name))
                {
                    return (int)weightPrice.Value;
                }
            }
            return 0;
        }
        public int getMedicalTherapistPriceByHour(WhiteLabelEntity whiteLabel, dynamic reservationData, string type)
        {
            SupportedService supportedService = whiteLabel.supportedServices.First(s => s.Type == type);
            DateTime Reservation_Date = DateTime.Parse(reservationData.Time.Value);
            DateTime Day_End = DateTime.Parse("2012/12/12 18:00:00.000");
            DateTime Day_Start = DateTime.Parse("2012/12/12 06:00:00.000");

            if (Reservation_Date.TimeOfDay > Day_End.TimeOfDay || Reservation_Date.TimeOfDay < Day_Start.TimeOfDay)
            {
                return ((int)supportedService.prices.medicalTherapist.night) * ((int)reservationData["Therapist_Stayig_Time"]);
            }
            else
            {
                return ((int)supportedService.prices.medicalTherapist.day) * ((int)reservationData["Therapist_Stayig_Time"]);
            }
        }

        public int getStairsAssistancePriceByHour(WhiteLabelEntity whiteLabel, dynamic reservationData, string type)
        {
            //TODO:add check night or day
            SupportedService supportedService = whiteLabel.supportedServices.First(s => s.Type == type);
            DateTime Reservation_Date = DateTime.Parse(reservationData.Time.Value);
            DateTime Day_End = DateTime.Parse("2012/12/12 18:00:00.000");
            DateTime Day_Start = DateTime.Parse("2012/12/12 06:00:00.000");

            if (Reservation_Date.TimeOfDay > Day_End.TimeOfDay || Reservation_Date.TimeOfDay < Day_Start.TimeOfDay)
            {
                return (int)supportedService.prices.stairsAssistance.night;
            }
            else
            {
                return (int)supportedService.prices.stairsAssistance.day;
            }
        }





        public void AcceptReservation(string reservationId)
        {
            var id = new ObjectId(reservationId);
            var filter = Builders<ReservationEntity>.Filter.Eq("_id", id);
            var update = Builders<ReservationEntity>.Update
                .Set("Status", "2");

            var result = _ctx.Reservations.UpdateOneAsync(filter, update);
        }

        public void UpdateReservationStatus(string reservationId, string status)
        {
            var id = new ObjectId(reservationId);
            var filter = Builders<ReservationEntity>.Filter.Eq("_id", id);
            var update = Builders<ReservationEntity>.Update
                .Set("Status", status);
            var result = _ctx.Reservations.UpdateOneAsync(filter, update);
        }
        public void UpdateReservationReason(string reservationId, string status, string reason)
        {
            var id = new ObjectId(reservationId);
            var filter = Builders<ReservationEntity>.Filter.Eq("_id", id);



            switch (status)
            {
                //Pending
                case "1":
                    var update = Builders<ReservationEntity>.Update
                          .Set("Pending_Reason", reason);
                    _ctx.Reservations.UpdateOneAsync(filter, update);
                    break;
                //Accepted
                case "2":
                    var updateAccepted = Builders<ReservationEntity>.Update
               .Set("Accepted_Reason", reason);
                    _ctx.Reservations.UpdateOneAsync(filter, updateAccepted);
                    break;
                //Ignored
                case "3":
                    var updateIgnored = Builders<ReservationEntity>.Update
               .Set("Ignored_Reason", reason);
                    _ctx.Reservations.UpdateOneAsync(filter, updateIgnored);
                    break;
                //Done
                case "4":
                    var updateDone = Builders<ReservationEntity>.Update
               .Set("Done_Reason", reason);
                    _ctx.Reservations.UpdateOneAsync(filter, updateDone);
                    break;
                //Canceled
                case "5":
                    var updateCanceled = Builders<ReservationEntity>.Update
               .Set("AdditionalProperties.Cancel_Reason", reason);
                    _ctx.Reservations.UpdateOneAsync(filter, updateCanceled);
                    break;
            }


        }

        public void UpdateReservationWLId(string reservationId, string whiteLabelId = null)
        {
            var id = new ObjectId(reservationId);
            var filter = Builders<ReservationEntity>.Filter.Eq("_id", id);
            var update = Builders<ReservationEntity>.Update
                .Set("WhiteLabel_ID", whiteLabelId);
            var result = _ctx.Reservations.UpdateOneAsync(filter, update);
        }

        public void HubUpdateWLAndClientReservationStatus(string clientId, string whiteLAbelId, string reservationId, string status)
        {
            switch (status)
            {
                //Pending
                case "1":
                    Hub.Clients.Group(clientId).reservationPending(reservationId);
                    Hub.Clients.Group(whiteLAbelId).reservationPending(reservationId);
                    break;
                //Accepted
                case "2":
                    Hub.Clients.Group(clientId).reservationAccepted(reservationId);
                    Hub.Clients.Group(whiteLAbelId).reservationAccepted(reservationId);
                    break;
                //Ignored
                case "3":
                    // UpdateReservationStatusWLId(reservationId);
                    Hub.Clients.Group(clientId).reservationIgnored(reservationId);
                    Hub.Clients.Group(whiteLAbelId).reservationIgnored(reservationId);
                    break;
                //Done
                case "4":
                    Hub.Clients.Group(clientId).reservationDone(reservationId);
                    Hub.Clients.Group(whiteLAbelId).reservationDone(reservationId);
                    break;
                //Canceled
                case "5":
                    Hub.Clients.Group(clientId).reservationCanceled(reservationId);
                    Hub.Clients.Group(whiteLAbelId).reservationCanceled(reservationId);
                    break;
            }
        }

        public ReservationEntity GetReservationById(string reservationId)
        {

            var builder = Builders<ReservationEntity>.Filter;
            var id = new ObjectId(reservationId);
            var filter = builder.Eq("_id", id);
            var reservation = _ctx.Reservations.Find(filter).ToListAsync().Result[0];
            return reservation;
        }

        public IReservationProperty CreateRequestProperty(eReservationAdditionalProperties key, string value)
        {
            return new ReservationProperty { Key = key, Value = value };
        }
        public BsonDocument ConvertJsonAdditionalProperties(dynamic jsonObjDepositRequest)
        {

            // IList<IReservationProperty> propesties = new List<IReservationProperty>();
            BsonDocument doc = BsonDocument.Parse(jsonObjDepositRequest.ToString());
            BsonDocument propesties = new BsonDocument { };
            if (jsonObjDepositRequest.AdditionalProperties == null)
                return propesties;

            for (int i = 0; i < jsonObjDepositRequest.AdditionalProperties.Count; i++)
            {

                // var key = (eReservationAdditionalProperties)jsonObjDepositRequest.AdditionalProperties[i].Key;
                var key = (String)jsonObjDepositRequest.AdditionalProperties[i].Key;

                //if (key=="date")
                //{

                //    var value = (DateTime)jsonObjDepositRequest.AdditionalProperties[i].Value;
                //    propesties.Add(key.ToString(), value);
                //}
                //else
                //{
                //    if (key == "Service_Options")
                //    {

                //        var value = doc["AdditionalProperties"][i]["Value"];
                //        propesties.Add(key.ToString(), value);
                //    }else
                //    {
                // var value = (string)jsonObjDepositRequest.AdditionalProperties[i].Value;
                var value = doc["AdditionalProperties"][i]["Value"];
                propesties.Add(key.ToString(), value);

                // }

                //   }
                // IReservationProperty property = CreateRequestProperty(key, value);


            }

            return propesties;

        }
        //public IList<IReservationProperty> ConvertJsonAdditionalProperties(dynamic jsonObjDepositRequest)
        //{

        //    IList<IReservationProperty> propesties = new List<IReservationProperty>();

        //    if (jsonObjDepositRequest.AdditionalProperties == null)
        //        return propesties;

        //    for (int i = 0; i < jsonObjDepositRequest.AdditionalProperties.Count; i++)
        //    {
        //        var key = (eReservationAdditionalProperties)jsonObjDepositRequest.AdditionalProperties[i].Key;
        //        var value = (string)jsonObjDepositRequest.AdditionalProperties[i].Value;
        //        IReservationProperty property = CreateRequestProperty(key, value);

        //        propesties.Add(property);
        //    }

        //    return propesties;

        //}


    }
}