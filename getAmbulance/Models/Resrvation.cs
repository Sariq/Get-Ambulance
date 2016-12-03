using AspNet.Identity.MongoDB;
using getAmbulance.Enums;
using getAmbulance.Interfaces;
using Microsoft.AspNet.Identity;
using MongoDB.Bson;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace getAmbulance.Models
{
    public class ReservationEntity : DatabaseObject
    {
   
        public string WhiteLabel_ID { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public string Full_Name { get; set; }
        public string Phone_Number { get; set; }
        public string Id_Number { get; set; }
        public string Age { get; set; }
        public BsonDocument AdditionalProperties { get; set; }
    }
    public class ReservationFormEntity
    {
        public string Place_Type { get; set; }
        public string From_Address { get; set; }
        public string To_Address { get; set; }
        public string Weight { get; set; }
        public string Patient_Status { get; set; }

    }

    public class WhiteLabelPriceOfferEntity
    {
        public string WhiteLabelName { get; set; }
        public string WhiteLabelId { get; set; }
        public string WhiteLabelLogo { get; set; }
        public string Price { get; set; }
    }
}