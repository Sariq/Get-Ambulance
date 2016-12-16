namespace getAmbulance
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AspNet.Identity.MongoDB;
    using Models;
    using MongoDB.Driver;
    using static WhiteLabel.WhiteLabelModel;
    public class ApplicationIdentityContext : IDisposable
	{
		public static ApplicationIdentityContext Create()
		{
            // todo add settings where appropriate to switch server & database in your own application
            //  var client = new MongoClient("mongodb://localhost:27017");
            // var database = client.GetDatabase("mydbtest");
            var client = new MongoClient("mongodb://getAmbulance:London2018!@ds023105.mlab.com:23105/getambulance_general");
            var database = client.GetDatabase("getambulance_general");
            var users = database.GetCollection<ApplicationUser>("users");
			var roles = database.GetCollection<IdentityRole>("roles");
            var browserClients = database.GetCollection<BrowserClient>("browserClients");
            var refreshTokens = database.GetCollection<RefreshToken>("refreshTokens");
            var reservations = database.GetCollection<ReservationEntity>("Reservations");
            var whiteLabels = database.GetCollection<WhiteLabelEntity>("WhiteLabels");
            var whiteLabelUsers = database.GetCollection<WhiteLabelUser>("WhiteLabelUsers");
            var dbcounter = database.GetCollection<DBCounter>("counters");
            return new ApplicationIdentityContext(users, roles, browserClients, refreshTokens, reservations, whiteLabels, whiteLabelUsers, dbcounter);
		}
        public ApplicationIdentityContext()
        {
            Create();
        }

        private ApplicationIdentityContext(IMongoCollection<ApplicationUser> users, IMongoCollection<IdentityRole> roles, IMongoCollection<BrowserClient> clients, IMongoCollection<RefreshToken> refreshTokens, IMongoCollection<ReservationEntity>  reservations, IMongoCollection<WhiteLabelEntity> whiteLabels, IMongoCollection<WhiteLabelUser> whiteLabelUsers, IMongoCollection<DBCounter> dbcounter)
		{
			Users = users;
			Roles = roles;
            BrowserClients = clients;
            RefreshTokens = refreshTokens;
            Reservations = reservations;
            WhiteLabels = whiteLabels;
            WhiteLabelUsers = whiteLabelUsers;
            DBCounter= dbcounter;
        }
        public IMongoCollection<ApplicationUser> Users { get; set; }
        public IMongoCollection<IdentityRole> Roles { get; set; }
        public IMongoCollection<BrowserClient> BrowserClients { get; set; }
        public IMongoCollection<RefreshToken> RefreshTokens { get; set; }
        public IMongoCollection<ReservationEntity> Reservations { get; set; }
        public IMongoCollection<WhiteLabelEntity> WhiteLabels { get; set; }
        public IMongoCollection<WhiteLabelUser> WhiteLabelUsers { get; set; }
        public IMongoCollection<DBCounter> DBCounter { get; set; }
        public Task<List<IdentityRole>> AllRolesAsync()
		{
			return Roles.Find(r => true).ToListAsync();
		}


        public void Dispose()
		{
		}
	}
}