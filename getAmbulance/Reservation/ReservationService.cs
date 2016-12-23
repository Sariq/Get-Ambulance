using getAmbulance.DB;
using getAmbulance.Enums;
using getAmbulance.Interfaces;
using getAmbulance.Models;
using getAmbulance.WhiteLabel;
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
        public void AddReservation(ReservationEntity reservation)
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
            //ReservationEntity r1 = new ReservationEntity { };

            //ReservationFormEntity rf = new ReservationFormEntity { };

            //rf.First_Name = "sari2";
            //rf.Last_Name = "qash2";
            //r1.Reservation_Form = rf;

            //r1.status = 1;
            //r1.WhiteLabel_ID = 1;
   

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
            foreach (WhiteLabelEntity whiteLabel in whiteLabelsList)
            {
                int distancePrice = getWhiteLabelDistancePriceByKM((BsonDocument)whiteLabel.prices["distance"], (int)jsonObj.distance.Value);
                int extraServicesPrice = getAmbulanceExtraServicesPrice((BsonDocument)whiteLabel.prices,jsonObj);
                int finalPrice = distancePrice + extraServicesPrice;
                whiteLabelsOfferList.Add(new WhiteLabelOfferEntity(whiteLabel.whiteLabelid, whiteLabel.name, whiteLabel.logo, finalPrice));
            }
            return whiteLabelsOfferList;
        }

        public List<WhiteLabelOfferEntity> GetMedicalTherapistOffersList(dynamic jsonObj)
        {
            List<WhiteLabelOfferEntity> whiteLabelsOfferList = new List<WhiteLabelOfferEntity>();
            List<WhiteLabelEntity> whiteLabelsList = _whiteLabelService.GetWhiteLabelsListByStatusAndServiceSupport(true,"2");
            foreach (WhiteLabelEntity whiteLabel in whiteLabelsList)
            {
                int extraServicesPrice = getMedicalTherapistPriceByHour((BsonDocument)whiteLabel.prices, jsonObj);
                int finalPrice = extraServicesPrice;
                whiteLabelsOfferList.Add(new WhiteLabelOfferEntity(whiteLabel.whiteLabelid, whiteLabel.name, whiteLabel.logo, finalPrice));
            }
            return whiteLabelsOfferList;
        }

        public List<WhiteLabelOfferEntity> GetStairsAssistanceOffersList(dynamic jsonObj)
        {
            List<WhiteLabelOfferEntity> whiteLabelsOfferList = new List<WhiteLabelOfferEntity>();
            List<WhiteLabelEntity> whiteLabelsList = _whiteLabelService.GetWhiteLabelsListByStatusAndServiceSupport(true,"3");
            foreach (WhiteLabelEntity whiteLabel in whiteLabelsList)
            {
                int extraServicesPrice = getStairsAssistancePriceByHour((BsonDocument)whiteLabel.prices, jsonObj);
                int finalPrice = extraServicesPrice;
                whiteLabelsOfferList.Add(new WhiteLabelOfferEntity(whiteLabel.whiteLabelid, whiteLabel.name, whiteLabel.logo, finalPrice));
            }
            return whiteLabelsOfferList;
        }


        public int getWhiteLabelDistancePriceByKM(BsonDocument distancePricesList,int reservationDistance)
        {
            foreach (var distance in distancePricesList)
            {
                if (reservationDistance <= Int32.Parse(distance.Name))
                {
                    //TODO: send dayOrNight
                    return (int)distance.Value["day"];
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
            return (int)prices["stairsAssistance"]["day"];
        }





        public void AcceptReservation(string reservationId)
        {
            var id = new ObjectId(reservationId);
            var filter = Builders<ReservationEntity>.Filter.Eq("_id", id);
            var update = Builders<ReservationEntity>.Update
                .Set("Status", "2");
             
            var result =  _ctx.Reservations.UpdateOneAsync(filter, update);
     



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