using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace getAmbulance.Bug_Report
{
    public class BugReportModel
    {
        public class BugReportEntity : DatabaseObject
        {
            public string Title { get; set; }
            public string Body { get; set; }
            public string AppCode { get; set; }
        }
    }
}