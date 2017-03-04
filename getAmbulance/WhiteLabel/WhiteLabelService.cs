using getAmbulance.Hubs;
using getAmbulance.Models;
using Microsoft.AspNet.SignalR;
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
        Lazy<IHubContext> hub = new Lazy<IHubContext>(
() => GlobalHost.ConnectionManager.GetHubContext<ReservationHub>()
);
        protected IHubContext Hub
        {
            get { return hub.Value; }
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
                basicData.phoneNumber = whiteLabel.phoneNumber;
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
                var filter = Builders<WhiteLabelEntity>.Filter.Where(x => x.supportedServices.Any(s => s.Type == serviceType && s.isOnline == status));
                var whiteLabelsList = _ctx.WhiteLabels.Find(filter).ToListAsync().Result;
                return whiteLabelsList;
            }
            catch (Exception ex)
            {
                return null;
            }

        }
        public List<WhiteLabelEntity> filterWhiteLabelListBySupportedArea(List<WhiteLabelEntity> whiteLabelsList, dynamic reservationData,string type)
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
                    var filterdSupportedService = whiteLabel.supportedServices.First(fs => fs.Type == type);
                    if(filterdSupportedService.supportedAreas!=null && filterdSupportedService.supportedAreas.Count > 0)
                    {

              
                    filterdList = filterdSupportedService.supportedAreas.Where(supportedArea =>
                    new GeoCoordinate(address.lat, address.lng).GetDistanceTo(new GeoCoordinate(supportedArea.lat, supportedArea.lng)) <= (supportedArea.radius * 1000)
                    ).ToList();
                    if (filterdList != null && filterdList.Count() > 0)
                    {
                        count++;
                    }
                    }
                }
                if (count == addressList.Count() && filterdList != null && filterdList.Count() > 0)
                {
                    filterdWhiteLabelLiset.Add(whiteLabel);

                }

            }
            return filterdWhiteLabelLiset;
        }
        public void UpdateWhiteLabelIsOnline(string whiteLabelId, bool status,string type)
        {
            var filter = Builders<WhiteLabelEntity>.Filter.Where(x => x.whiteLabelid == whiteLabelId && x.supportedServices.Any(s => s.Type == type));
            var update = Builders<WhiteLabelEntity>.Update.Set("supportedServices.$.isOnline", status);
            var result = _ctx.WhiteLabels.UpdateOneAsync(filter, update).Result;

            HubUpdateWLDataUpdated(whiteLabelId);
        }
        public void HubUpdateWLDataUpdated(string whiteLAbelId)
        {
            Hub.Clients.Group(whiteLAbelId).whiteLabelDataUpdated();
        }
        public WhiteLabelEntity GetWhiteLabelById(string whiteLabelId)
        {
            WhiteLabelEntity result = null;
            try
            {
                var builder = Builders<WhiteLabelEntity>.Filter;

                var filter = builder.Eq("whiteLabelid", whiteLabelId);
                var whiteLabel = _ctx.WhiteLabels.Find(filter).ToListAsync().Result;
                if (whiteLabel != null && whiteLabel.Count > 0)
                {
                    result = whiteLabel[0];
                }
                return result;
            }
            catch (AggregateException e)
            {
                Console.WriteLine(e);
            }
            return result;

        }


        public void UpdatePricesByCategory(BsonDocument jsonObj)
        {

           // var filter = Builders<WhiteLabelEntity>.Filter.Eq("whiteLabelid", jsonObj["whiteLabelId"] && );
            var filter = Builders<WhiteLabelEntity>.Filter.Where(x => x.whiteLabelid == jsonObj["whiteLabelId"] && x.supportedServices.Any(s => s.Type == jsonObj["type"]));

            var update = Builders<WhiteLabelEntity>.Update
                .Set("supportedServices.$.prices." + jsonObj["category"].ToString(), jsonObj["updatedData"]);
            var result = _ctx.WhiteLabels.UpdateOneAsync(filter, update);
            HubUpdateWLAndClientReservationStatus((string)jsonObj["whiteLabelId"]);
        }
        public void DeletePricesByCategory(BsonDocument jsonObj)
        {
            var filter = Builders<WhiteLabelEntity>.Filter.Eq("whiteLabelid", jsonObj["whiteLabelId"]);
            filter = filter & Builders<WhiteLabelEntity>.Filter.Eq("prices.Private_Ambulance.distance", "2");

            var update = Builders<WhiteLabelEntity>.Update
                .Unset("prices." + jsonObj["category"].ToString());
            var result = _ctx.WhiteLabels.DeleteOneAsync(filter);
        }

        public void UpdateAmbulancePrices(BsonDocument jsonObj)
        {

            var filter = Builders<WhiteLabelEntity>.Filter.Eq("whiteLabelid", jsonObj["whiteLabelId"]);

            var update = Builders<WhiteLabelEntity>.Update
                .Set("prices.Private_Ambulance.distance." + jsonObj["index"].ToString(), jsonObj["updatedData"]);
            var result = _ctx.WhiteLabels.UpdateOneAsync(filter, update);
        }
        public void HubUpdateWLAndClientReservationStatus(string whiteLAbelId)
        {
            Hub.Clients.Group(whiteLAbelId).whiteLabelDataUpdated();
        }
        public void AddSupportedAreas(string whiteLabelId, List<SupportedArea> supportedAreaList, string type)
        {
            var filter = Builders<WhiteLabelEntity>.Filter.Where(x => x.whiteLabelid == whiteLabelId && x.supportedServices.Any(s => s.Type == type));
            foreach (var supportedArea in supportedAreaList)
            {
                var update = Builders<WhiteLabelEntity>.Update
                   .Push("supportedServices.$.supportedAreas", supportedArea);
                var result = _ctx.WhiteLabels.UpdateOneAsync(filter, update);
            }
            HubUpdateWLAndClientReservationStatus(whiteLabelId);
        }
        public void AddSupportedServices(string whiteLabelId, List<SupportedService> supportedServiceList, string type)
        {
            var filter = Builders<WhiteLabelEntity>.Filter.Where(x => x.whiteLabelid == whiteLabelId);
            foreach (var supportedService in supportedServiceList)
            {
                var update = Builders<WhiteLabelEntity>.Update
                   .Push("supportedServices", supportedService);
                var result = _ctx.WhiteLabels.UpdateOneAsync(filter, update);
            }
            HubUpdateWLAndClientReservationStatus(whiteLabelId);
        }
        public void UpdateSupportedAreas(string whiteLabelId, List<SupportedArea> supportedAreaList, string type, string index)
        {
            foreach (var supportedArea in supportedAreaList)
            {
                var filter = Builders<WhiteLabelEntity>.Filter.Where(x => x.whiteLabelid == whiteLabelId && x.supportedServices.Any(s => s.Type == type && s.supportedAreas.Any(a => a.name == supportedArea.name)));
                var update = Builders<WhiteLabelEntity>.Update.Set("supportedServices.$.supportedAreas." + index, supportedArea);
                var result = _ctx.WhiteLabels.UpdateOneAsync(filter, update).Result;
            }
            HubUpdateWLAndClientReservationStatus(whiteLabelId);
        }
        public void DeleteSupportedAreas(string whiteLabelId, List<SupportedArea> supportedAreaList, string type)
        {
            var filter = Builders<WhiteLabelEntity>.Filter.Where(x => x.whiteLabelid == whiteLabelId && x.supportedServices.Any(s => s.Type == type));

            foreach (var supportedArea in supportedAreaList)
            {
                var update = Builders<WhiteLabelEntity>.Update.PullFilter("supportedServices.$.supportedAreas",
                    Builders<SupportedArea>.Filter.Where(f => f.name == supportedArea.name));
                try
                {
                    var result = _ctx.WhiteLabels.FindOneAndUpdateAsync(filter, update).Result;

                }
                catch (AggregateException e)
                {
                    Console.WriteLine(e);
                }
            }
            HubUpdateWLAndClientReservationStatus(whiteLabelId);
        }

        public void DeleteSupportedServices(string whiteLabelId, List<SupportedService> supportedServiceList, string type)
        {
            var filter = Builders<WhiteLabelEntity>.Filter.Where(x => x.whiteLabelid == whiteLabelId);
                var update = Builders<WhiteLabelEntity>.Update.PullFilter("supportedServices",
                    Builders<SupportedService>.Filter.Where(f => f.Type == type));
                try
                {
                    var result = _ctx.WhiteLabels.FindOneAndUpdateAsync(filter, update).Result;

                }
                catch (AggregateException e)
                {
                    Console.WriteLine(e);
                }
            HubUpdateWLAndClientReservationStatus(whiteLabelId);
        }
        
    }
}