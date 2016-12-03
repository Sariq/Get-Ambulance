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
    public class WhiteLabelUser : IdentityUser
    {
        
            public virtual WhiteLabelUserEntity whiteLabelUser { get; set; }
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<WhiteLabelUser> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here

            return userIdentity;
        }


    }

    public class WhiteLabelUserEntity
    {
    
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string WhiteLabelId { get;set; }
    }
}