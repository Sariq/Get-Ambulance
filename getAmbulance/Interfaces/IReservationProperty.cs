using getAmbulance.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace getAmbulance.Interfaces
{
    public interface IReservationProperty
    {
        eReservationAdditionalProperties Key { get; set; }
        string Value { get; set; }
    }
}