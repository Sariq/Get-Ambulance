using MongoDB.Bson;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace getAmbulance.WhiteLabel
{
    public class WhiteLabelModel
    {
        public class WhiteLabelEntity : DatabaseObject
        {
            public string whiteLabelid { get; set; }
            public string name { get; set; }
            public dynamic users { get; set; }
            public dynamic prices { get; set; }
            public List<SupportedArea> supportedAreas { get; set; }
            public List<SupportedService> supportedServices { get; set; }
            public bool isOnline { get; set; }
            public string logo { get; set; }
            public string phoneNumber { get; set; }
            public string phoneNumber2 { get; set; }
            public string phoneNumber3 { get; set; }
            public string Description { get; set; }

            public string Fax { get; set; }
            public string Email { get; set; }
            public string WebSite { get; set; }
            public string Postal_Code { get; set; }
            public string City { get; set; }
            public string Address { get; set; }
            public string LegalNumber { get; set; }


            public WhiteLabelEntity() {
                this.supportedServices = new List<SupportedService>();
            }




        }
        public class SupportedService
        {
            public string Type { get; set; }
            public string Name { get; set; }
            public List<SupportedArea> supportedAreas { get; set; }
            public bool isOnline { get; set; }
            public string logo { get; set; }
            public dynamic prices { get; set; }
            public SupportedService()
            {
                this.supportedAreas = new List<SupportedArea>();
                this.prices = new System.Dynamic.ExpandoObject();
                this.isOnline = false;
            }

        }

        public class WhiteLabelResponseEntity : DatabaseObject
        {
            public string whiteLabelid { get; set; }
            public string name { get; set; }
            public dynamic users { get; set; }
            public dynamic prices { get; set; }
            public List<SupportedService> supportedServices { get; set; }
            public List<SupportedArea> supportedAreas { get; set; }

            public bool isOnline { get; set; }
            public string logo { get; set; }
        }
        public class SupportedArea
        {
            public string name { get; set; }
            public double lat { get; set; }
            public double lng { get; set; }
            public double radius { get; set; }
        }
        public class WhiteLabelBasicDataModel
        {
            public string whiteLabel_Id { get; set; }
            public string name { get; set; }
            public string logo { get; set; }
            public string phoneNumber { get; set; }


        }
        public class WhiteLabelOfferEntity
        {
            public WhiteLabelOfferEntity(string whiteLabelid, string name, string logo, int finalPrice)
            {
                this.whiteLabelid = whiteLabelid;
                this.name = name;
                this.logo = logo;
                this.price = finalPrice;
            }

            public string whiteLabelid { get; set; }
            public string name { get; set; }
            public string logo { get; set; }
            public int price { get; set; }
        }

    }
}