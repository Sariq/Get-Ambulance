namespace getAmbulance
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AspNet.Identity.MongoDB;
    using Models;
    using MongoDB.Driver;
    using static WhiteLabel.WhiteLabelModel;
    using static Bug_Report.BugReportModel;
    using System.Web.Configuration;
    public class ApplicationIdentityContext : IDisposable
	{
		public static ApplicationIdentityContext Create()
		{
            // todo add settings where appropriate to switch server & database in your own application
            //  var client = new MongoClient("mongodb://localhost:27017");
            // var database = client.GetDatabase("mydbtest");
            var client = new MongoClient(WebConfigurationManager.AppSettings["DBConnectionString"]);
            var database = client.GetDatabase(WebConfigurationManager.AppSettings["DBName"]);
            var users = database.GetCollection<ApplicationUser>("users");
            var clientUsers = database.GetCollection<ApplicationClientUser>("clientUsers");
            var roles = database.GetCollection<IdentityRole>("roles");
            var browserClients = database.GetCollection<BrowserClient>("browserClients");
            var refreshTokens = database.GetCollection<RefreshToken>("refreshTokens");
            var reservations = database.GetCollection<ReservationEntity>("Reservations");
            var whiteLabels = database.GetCollection<WhiteLabelEntity>("WhiteLabels");
            var whiteLabelUsers = database.GetCollection<WhiteLabelUser>("WhiteLabelUsers");
            var dbcounter = database.GetCollection<DBCounter>("counters");
            var bugReport = database.GetCollection<BugReportEntity>("BugReports");

            

            return new ApplicationIdentityContext(users, clientUsers, roles, browserClients, refreshTokens, reservations, whiteLabels, whiteLabelUsers, dbcounter, bugReport);
		}
        public ApplicationIdentityContext()
        {
            Create();
        }

        private ApplicationIdentityContext(IMongoCollection<ApplicationUser> users,IMongoCollection<ApplicationClientUser> clientUsers, IMongoCollection<IdentityRole> roles, IMongoCollection<BrowserClient> clients, IMongoCollection<RefreshToken> refreshTokens, IMongoCollection<ReservationEntity>  reservations, IMongoCollection<WhiteLabelEntity> whiteLabels, IMongoCollection<WhiteLabelUser> whiteLabelUsers, IMongoCollection<DBCounter> dbcounter, IMongoCollection<BugReportEntity> bugReport)
		{
			Users = users;
            ClientUsers = clientUsers;
            Roles = roles;
            BrowserClients = clients;
            RefreshTokens = refreshTokens;
            Reservations = reservations;
            WhiteLabels = whiteLabels;
            WhiteLabelUsers = whiteLabelUsers;
            DBCounter= dbcounter;
            BugReport = bugReport;
        }
        public IMongoCollection<ApplicationUser> Users { get; set; }
        public IMongoCollection<ApplicationClientUser> ClientUsers { get; set; }
        public IMongoCollection<IdentityRole> Roles { get; set; }
        public IMongoCollection<BrowserClient> BrowserClients { get; set; }
        public IMongoCollection<RefreshToken> RefreshTokens { get; set; }
        public IMongoCollection<ReservationEntity> Reservations { get; set; }
        public IMongoCollection<WhiteLabelEntity> WhiteLabels { get; set; }
        public IMongoCollection<WhiteLabelUser> WhiteLabelUsers { get; set; }
        public IMongoCollection<DBCounter> DBCounter { get; set; }
        public IMongoCollection<BugReportEntity> BugReport { get; set; }

        public Task<List<IdentityRole>> AllRolesAsync()
		{
			return Roles.Find(r => true).ToListAsync();
		}


        public void Dispose()
		{
		}

	}
}