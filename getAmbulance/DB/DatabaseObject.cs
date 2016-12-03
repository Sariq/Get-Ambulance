using MongoDB.Bson;
using System;
using System.Runtime.Serialization;


public class DatabaseObject
{

    public ObjectId _id { get; set; }
    public DateTime _date { get; set; }

    public DatabaseObject()
    {
        _id = ObjectId.GenerateNewId();
        _date = Convert.ToDateTime(DateTime.Now.ToString());
    }
}