using AspNet.Identity.MongoDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace getAmbulance.Helpers
{
    public class HelperService
    {
        public IdentityUserClaim GetValueByTypeFromClaims(List<IdentityUserClaim> claimsIdentity, string type)
        {
            foreach (IdentityUserClaim claim in claimsIdentity)
            {
                if (claim.Type.Equals(type))
                {
                    return claim;
                }

            }
            return null;
        }
    }
}