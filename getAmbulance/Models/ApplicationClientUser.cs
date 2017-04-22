using AspNet.Identity.MongoDB;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace getAmbulance.Models
{
    public class ApplicationClientUser : IdentityUser
    {
        public string Id_Number { get; set; }
        public string Full_Name { get; set; }
        public DateTime Date_Of_Birth { get; set; }
        public DateTime CreatedDate { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationClientUser> manager)
        {

            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ExternalBearer);
            // Add custom user claims here
            return userIdentity;
        }
    }
}