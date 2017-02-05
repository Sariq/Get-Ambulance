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
                HubUpdateWLAndClientReservationStatus(reservation.Client_ID,reservation.WhiteLabel_ID, reservation._id.ToString(), reservation.Status);

            }
            catch (Exception ex)
            {

            }
            return reservation;
        }
        public void UpdateReservationDateToNow(string reservationId) {
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
            var filter= builder.Empty;
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
            if (statusArray!=null && statusArray.Count > 0) {
                var statusFilter = builder.Empty;
                statusFilter = builder.Eq("Status", statusArray[0].Value);
                for (int i = 1; i <= statusArray.Count-1; i++)
                {
                    statusFilter = statusFilter | builder.Eq("Status", statusArray[i].Value);

                }
                filter = filter & statusFilter;
            }
            if (typeArray != null && typeArray.Count>0)
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
            List<WhiteLabelOfferEntity> whiteLabelsOfferList= new List<WhiteLabelOfferEntity>();
            List <WhiteLabelEntity> whiteLabelsList= _whiteLabelService.GetWhiteLabelsListByStatusAndServiceSupport(true,"1");
            List<WhiteLabelEntity> filterdWhiteLabelLiset = _whiteLabelService.filterWhiteLabelListBySupportedArea(whiteLabelsList, jsonObj);

            foreach (WhiteLabelEntity whiteLabel in filterdWhiteLabelLiset)
            {
                int distancePrice = getWhiteLabelDistancePriceByKM((BsonDocument)whiteLabel.prices["distance"], jsonObj);
                int extraServicesPrice = getAmbulanceExtraServicesPrice((BsonDocument)whiteLabel.prices,jsonObj.form);
                int finalPrice = distancePrice + extraServicesPrice;
                whiteLabelsOfferList.Add(new WhiteLabelOfferEntity(whiteLabel.whiteLabelid, whiteLabel.name, whiteLabel.logo, finalPrice));
            }
            return whiteLabelsOfferList;
        }

        public List<WhiteLabelOfferEntity> GetMedicalTherapistOffersList(dynamic jsonObj)
        {
            List<WhiteLabelOfferEntity> whiteLabelsOfferList = new List<WhiteLabelOfferEntity>();
            List<WhiteLabelEntity> whiteLabelsList = _whiteLabelService.GetWhiteLabelsListByStatusAndServiceSupport(true,"2");
            List<WhiteLabelEntity> filterdWhiteLabelLiset = _whiteLabelService.filterWhiteLabelListBySupportedArea(whiteLabelsList, jsonObj);

            foreach (WhiteLabelEntity whiteLabel in filterdWhiteLabelLiset)
            {
                int extraServicesPrice = getMedicalTherapistPriceByHour((BsonDocument)whiteLabel.prices, jsonObj.form);
                int finalPrice = extraServicesPrice;
                whiteLabelsOfferList.Add(new WhiteLabelOfferEntity(whiteLabel.whiteLabelid, whiteLabel.name, whiteLabel.logo, finalPrice));
            }
            return whiteLabelsOfferList;
        }

        public List<WhiteLabelOfferEntity> GetStairsAssistanceOffersList(dynamic jsonObj)
        {
            List<WhiteLabelOfferEntity> whiteLabelsOfferList = new List<WhiteLabelOfferEntity>();
            List<WhiteLabelEntity> whiteLabelsList = _whiteLabelService.GetWhiteLabelsListByStatusAndServiceSupport(true,"3");
            List<WhiteLabelEntity> filterdWhiteLabelLiset = _whiteLabelService.filterWhiteLabelListBySupportedArea(whiteLabelsList, jsonObj);

            foreach (WhiteLabelEntity whiteLabel in filterdWhiteLabelLiset)
            {
                int extraServicesPrice = getStairsAssistancePriceByHour((BsonDocument)whiteLabel.prices, jsonObj.form);
                int finalPrice = extraServicesPrice;
                whiteLabelsOfferList.Add(new WhiteLabelOfferEntity(whiteLabel.whiteLabelid, whiteLabel.name, whiteLabel.logo, finalPrice));
            }
            return whiteLabelsOfferList;
        }


        public int getWhiteLabelDistancePriceByKM(BsonDocument distancePricesList, dynamic jsonObj)
        {
            foreach (var distance in distancePricesList)
            {
                if ((int)jsonObj.form.distance.Value <= Int32.Parse(distance.Name))
                {
   
                    
                    DateTime Reservation_Date = DateTime.Parse(jsonObj.form.Time.Value);
                    DateTime Day_End = DateTime.Parse("2012/12/12 18:00:00.000");
                    DateTime Day_Start = DateTime.Parse("2012/12/12 06:00:00.000");

                    if (Reservation_Date.TimeOfDay > Day_End.TimeOfDay || Reservation_Date.TimeOfDay < Day_Start.TimeOfDay)
                    {
                        return (int)distance.Value["night"];
                    }
                    else
                    {
                        return (int)distance.Value["day"];
                    }
                }
            }
            return 0;
        }
        public int getAmbulanceExtraServicesPrice(BsonDocument prices, dynamic reservationData)
        {
            var temp_prices = prices;
            foreach (var weightPrice in (BsonDocument)prices["weight"])
            {
                if ((int)reservationData["Weight"] <= Int32.Parse(weightPrice.Name))
                {
                    return (int)weightPrice.Value;
                }
            }
            return 0;
        }
        public int getStairsAssistanceExtraServicesPrice(BsonDocument prices, dynamic reservationData)
        {
            var temp_prices = prices;
            foreach (var weightPrice in (BsonDocument)prices["weight"])
            {
                if ((int)reservationData["Weight"] <= Int32.Parse(weightPrice.Name))
                {
                    return (int)weightPrice.Value;
                }
            }
            return 0;
        }
        public int getMedicalTherapistPriceByHour(BsonDocument prices, dynamic reservationData)
        {
                    return ((int)prices["medicaTherapist"]) * ((int)reservationData["Therapist_Stayig_Time"]);
        }

        public int getStairsAssistancePriceByHour(BsonDocument prices, dynamic reservationData)
        {
            //TODO:add check night or day
       
            DateTime Reservation_Date = DateTime.Parse(reservationData.Time.Value);
            DateTime Day_End = DateTime.Parse("2012/12/12 18:00:00.000");
            DateTime Day_Start = DateTime.Parse("2012/12/12 06:00:00.000");

            if (Reservation_Date.TimeOfDay > Day_End.TimeOfDay || Reservation_Date.TimeOfDay < Day_Start.TimeOfDay)
            {
                return (int)prices["stairsAssistance"]["night"];
            }
            else
            {
                return (int)prices["stairsAssistance"]["day"];
            }
        }





        public void AcceptReservation(string reservationId)
        {
            var id = new ObjectId(reservationId);
            var filter = Builders<ReservationEntity>.Filter.Eq("_id", id);
            var update = Builders<ReservationEntity>.Update
                .Set("Status", "2");
             
            var result =  _ctx.Reservations.UpdateOneAsync(filter, update);
        }

        public void UpdateReservationStatus(string reservationId, string status)
        {
            var id = new ObjectId(reservationId);
            var filter = Builders<ReservationEntity>.Filter.Eq("_id", id);
            var update = Builders<ReservationEntity>.Update
                .Set("Status", status);
            var result = _ctx.Reservations.UpdateOneAsync(filter, update);
        }
        public void UpdateReservationWLId(string reservationId, string whiteLabelId=null)
        {
            var id = new ObjectId(reservationId);
            var filter = Builders<ReservationEntity>.Filter.Eq("_id", id);
            var update = Builders<ReservationEntity>.Update
                .Set("WhiteLabel_ID", whiteLabelId);
            var result = _ctx.Reservations.UpdateOneAsync(filter, update);
        }
        
        public void HubUpdateWLAndClientReservationStatus(string clientId,string whiteLAbelId, string reservationId,string status)
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
            BsonDocument propesties =new BsonDocument{ };
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