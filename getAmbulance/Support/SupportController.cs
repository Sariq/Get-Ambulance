using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using static getAmbulance.Support.SupportModel;

namespace getAmbulance.Support
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [System.Web.Http.Authorize]
    public class SupportController : ApiController
    {
        private ApplicationIdentityContext _ctx;
        private SupportService _SupportService;



        public SupportController()
        {
            _ctx = ApplicationIdentityContext.Create();
            _SupportService = new SupportService();
        }



        // POST: /Reservation/Add
        //[HttpPost]
        //[AllowAnonymous]
        //public HttpResponseMessage SendBugReport(BugReport BugReport)
        //{
        //    HttpResponseMessage response;
        //    _SupportService.SendBugReport(BugReport);
        //    response = Request.CreateResponse(HttpStatusCode.OK);
        //    return response;
        //}

        }
    }
