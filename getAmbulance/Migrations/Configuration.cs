using getAmbulance.Models;
using getAmbulance.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace getAmbulance.Migrations
{
    internal sealed class Configuration 
    {
     
        private static void BuildClientsList()
        {

            List<BrowserClient> ClientsList = new List<BrowserClient>
            {
                new BrowserClient
                { Type = "ngAuthApp",
                    Secret= Helper.GetHash("abc@123"),
                    Name="AngularJS front-end Application",
                    ApplicationTypeId =  Enums.ApplicationTypes.JavaScript,
                    Active = true,
                    RefreshTokenLifeTime = 7200,
                    AllowedOrigin = "http://ngauthenticationweb.azurewebsites.net"
                },
                new BrowserClient
                { Type = "consoleApp",
                    Secret=Helper.GetHash("123@abc"),
                    Name="Console Application",
                    ApplicationTypeId =Enums.ApplicationTypes.NativeConfidential,
                    Active = true,
                    RefreshTokenLifeTime = 14400,
                    AllowedOrigin = "*"
                }
            };

       
        }
    }
}