using getAmbulance.DB;
using getAmbulance.Hubs;
using Microsoft.AspNet.SignalR;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static getAmbulance.Bug_Report.BugReportModel;

namespace getAmbulance.Bug_Report
{
    public class BugReportService
    {
        private ApplicationIdentityContext _ctx;
        private DBService _dbSerivce;
        public BugReportService()
        {
            _ctx = ApplicationIdentityContext.Create();
            _dbSerivce = new DBService();


        }


        Lazy<IHubContext> hub = new Lazy<IHubContext>(
() => GlobalHost.ConnectionManager.GetHubContext<ReservationHub>()
);
        public void addBugReport(BugReportEntity bugObject)
        {
            try
            {
                int reportNumber = _dbSerivce.getNextSequence("Report_Number");
                bugObject.Report_Number = reportNumber;
                _ctx.BugReport.InsertOneAsync(bugObject);

            }
            catch (Exception ex)
            {

            }

        }
        public List<BugReportEntity> GetBugReportList()
        {
            List<BugReportEntity> BugReportList=null;
            try
            {
               BugReportList = _ctx.BugReport.Aggregate().ToListAsync().Result;
                return BugReportList;
            }
            catch (Exception ex)
            {

            }
            return BugReportList;
        }


    }
}