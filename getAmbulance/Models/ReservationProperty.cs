using getAmbulance.Enums;
using getAmbulance.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace getAmbulance.Models
{

    public class ReservationProperty: IReservationProperty
    {
        public eReservationAdditionalProperties Key { get; set; }
        public string Value { get; set; }
    }
}