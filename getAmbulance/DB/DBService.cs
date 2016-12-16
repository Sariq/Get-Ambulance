using getAmbulance.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace getAmbulance.DB
{
    public class DBService
    {


        private ApplicationIdentityContext _ctx;
        public DBService()
        {
            _ctx = ApplicationIdentityContext.Create();
        }
        public int getNextSequence(string name)
        {
            var filter = Builders<DBCounter>.Filter.Eq("_id", name);
            var update = new BsonDocument("$inc", new BsonDocument { { "seq", 1 } });
            var ret = _ctx.DBCounter.FindOneAndUpdateAsync(filter, update).Result;
            return ret.seq;
        }

    }
}