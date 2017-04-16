using getAmbulance.DB;
using getAmbulance.WhiteLabel;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static getAmbulance.Support.SupportModel;

namespace getAmbulance.Support
{
    public class SupportService
    {
        private ApplicationIdentityContext _ctx;
        private WhiteLabelService _whiteLabelService;
        private DBService _dbSerivce;
        public SupportService()
        {
            _ctx = ApplicationIdentityContext.Create();
            _whiteLabelService = new WhiteLabelService();
            _dbSerivce = new DBService();
        }


    }
}