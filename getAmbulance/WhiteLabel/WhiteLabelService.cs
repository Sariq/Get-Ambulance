using getAmbulance.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Device.Location;
using System.Linq;
using System.Web;
using static getAmbulance.WhiteLabel.WhiteLabelModel;

namespace getAmbulance.WhiteLabel
{
    public class WhiteLabelService
    {
        private ApplicationIdentityContext _ctx;
        public WhiteLabelService()
        {
            _ctx = ApplicationIdentityContext.Create();
            
        }

        public List<WhiteLabelEntity> GetWhiteLabelsList()
        {
            var whiteLabelsList = _ctx.WhiteLabels.Aggregate().ToListAsync().Result;
            return whiteLabelsList;
        }
        public List<WhiteLabelBasicDataModel> GetWhiteLabelsBasicDataList(List<WhiteLabelEntity> whiteLabelsList)
        {
            List<WhiteLabelBasicDataModel> whiteLabelsBasicDataList = new List<WhiteLabelBasicDataModel>();
            foreach (var whiteLabel in whiteLabelsList)
            {
                WhiteLabelBasicDataModel basicData = new WhiteLabelBasicDataModel();
                basicData.logo = whiteLabel.logo;
                basicData.name = whiteLabel.name;
                basicData.whiteLabel_Id = whiteLabel.whiteLabelid;
                basicData.phoneNumber=whiteLabel.phoneNumber;
                whiteLabelsBasicDataList.Add(basicData);
            }
            return whiteLabelsBasicDataList;
        }
        
        public List<WhiteLabelEntity> GetWhiteLabelsListByStatus(bool status)
        {
            var builder = Builders<WhiteLabelEntity>.Filter;
            var filter = builder.Eq("isOnline", status);
            var whiteLabelsList = _ctx.WhiteLabels.Find(filter).ToListAsync().Result;
            return whiteLabelsList;
        }
        public List<WhiteLabelEntity> GetWhiteLabelsListByStatusAndServiceSupport(bool status, string serviceType)
        {
            try
            {
                var builder = Builders<WhiteLabelEntity>.Filter;
                var filter = builder.Eq("isOnline", status);
                filter = filter & builder.Eq("supportedServices", serviceType);
                var whiteLabelsList = _ctx.WhiteLabels.Find(filter).ToListAsync().Result;

               

              
                return whiteLabelsList;
            }
            catch (Exception ex)
            {
                return null;
            }

        }
        public List<WhiteLabelEntity> filterWhiteLabelListBySupportedArea(List<WhiteLabelEntity> whiteLabelsList, dynamic reservationData)
        {
           // double lat2 = 32.23823691911867, lng2 = 34.944726969285284, lat = 32.2394348, lng = 34.9503489;
            List<AddressLatLng> addressList = reservationData.addressList.ToObject<List<AddressLatLng>>();

            List<WhiteLabelEntity> filterdWhiteLabelLiset = new List<WhiteLabelEntity>();
            List<SupportedArea> filterdList = new List<SupportedArea>();
            int count;
            foreach (var whiteLabel in whiteLabelsList)
                {
                count = 0;
                foreach (var address in addressList)
                {
                    filterdList = whiteLabel.supportedAreas.Where(supportedArea =>
                  new GeoCoordinate(address.lat, address.lng).GetDistanceTo(new GeoCoordinate(supportedArea.lat, supportedArea.lng)) <= Math.Sqrt(10) * 100
                  ).ToList();
                    if(filterdList!=null && filterdList.Count() > 0)
                    {
                        count++;
                    }
                }
                if (count== addressList.Count() && filterdList != null && filterdList.Count() > 0)
                {
                    filterdWhiteLabelLiset.Add(whiteLabel);

                }
               
                }
            return filterdWhiteLabelLiset;
        }
        public void UpdateWhiteLabelIsOnline(string whiteLabelId,bool status)
        {
     
            var filter = Builders<WhiteLabelEntity>.Filter.Eq("whiteLabelid", whiteLabelId);
            var update = Builders<WhiteLabelEntity>.Update
                .Set("isOnline",status);
            var result = _ctx.WhiteLabels.UpdateOneAsync(filter, update);
        }

        public WhiteLabelEntity GetWhiteLabelById(string whiteLabelId)
        {

            var builder = Builders<WhiteLabelEntity>.Filter;
       
            var filter = builder.Eq("whiteLabelid", whiteLabelId);
            var whiteLabel = _ctx.WhiteLabels.Find(filter).ToListAsync().Result[0];
            return whiteLabel;
        }

        
        public void UpdatePricesByCategory(BsonDocument jsonObj)
        {

            var filter = Builders<WhiteLabelEntity>.Filter.Eq("whiteLabelid", jsonObj["whiteLabelId"]);

            var update = Builders<WhiteLabelEntity>.Update
                .Set("prices."+jsonObj["category"].ToString(), jsonObj["updatedData"]);
            var result = _ctx.WhiteLabels.UpdateOneAsync(filter, update);
        }
        public void AddSupportedAreas(string whiteLabelId,List<SupportedArea> supportedAreaList)
        {
    
            var filter = Builders<WhiteLabelEntity>.Filter.Eq("whiteLabelid", whiteLabelId);

            //var update = Builders<WhiteLabelEntity>.Update
            //    .Set("supportedAreas", supportedAreaList);
            foreach (var supportedArea in supportedAreaList)
            {
                var update = Builders<WhiteLabelEntity>.Update
                   .Push(e => e.supportedAreas, supportedArea);
                var result = _ctx.WhiteLabels.UpdateOneAsync(filter, update);
            }



        }

    }
}