﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace getAmbulance.Bug_Report
{
    public class BugReportModel
    {
        public class BugReportEntity : DatabaseObject
        {
            public FromObject From { get; set; }
            public string Body { get; set; }
            public string AppCode { get; set; }
            public int Report_Number { get; set; }
        }

        public class FromObject
        {
            public string Name { get; set; }
            public string Id { get; set; }

        }
    }
}