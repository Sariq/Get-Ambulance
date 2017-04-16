 using getAmbulance.Helpers;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using static getAmbulance.Bug_Report.BugReportModel;

namespace getAmbulance.Bug_Report
{
    public class BugReportController : ApiController
    {
        private ApplicationIdentityContext _ctx;
        private BugReportService _BugReportService;

        private Helpers.HelperService _HelperService;

        public BugReportController()
        {
            _ctx = ApplicationIdentityContext.Create();
            _BugReportService = new BugReportService();
          
            _HelperService = new HelperService();
        }
        // Post: /BugReport/AddBugReport
        [HttpPost]
        public HttpResponseMessage AddBugReport(BugReportEntity bugObject)
        {
            HttpResponseMessage response;
            try
            {
                _BugReportService.addBugReport(bugObject);
                response = Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "AUpdateWhiteLabelIsOnline Error");
            }
            return response;
        }
        // Post: /BugReport/GetBugReportList
        [HttpPost]
        public HttpResponseMessage GetBugReportList()
        {
            HttpResponseMessage response;
            try
            {
                List<BugReportEntity> BugReportList=_BugReportService.GetBugReportList();
                response = Request.CreateResponse(HttpStatusCode.OK, BugReportList);
            }
            catch (Exception ex)
            {
                response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "AUpdateWhiteLabelIsOnline Error");
            }
            return response;
        }

        
    }
}
