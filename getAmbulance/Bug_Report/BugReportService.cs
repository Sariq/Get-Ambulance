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
        public BugReportService()
        {
            _ctx = ApplicationIdentityContext.Create();

        }
        public void addBugReport(BugReportEntity bugObject)
        {
            try
            {
                _ctx.BugReport.InsertOneAsync(bugObject);

            }
            catch (Exception ex)
            {

            }
  
        }
    }
}