using MongoDB.Bson;
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
            public BsonDocument users { get; set; }
            public BsonDocument prices { get; set; }
            public bool isOnline { get; set; }
            public string logo { get; set; }
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