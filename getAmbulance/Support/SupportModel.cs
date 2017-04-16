using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace getAmbulance.Support
{
    public class SupportModel
    {
        public class BugReport : DatabaseObject
        {
            public FromObject From { get; set; }
            public string ReportText { get; set; }
            public int Report_Number { get; set; }

            
        }
        public class FromObject
        {
            public string Name { get; set; }
            public string Id { get; set; }

        }
    }
}