using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Models.Domain
{
    public class Trip
    {
        [BsonRepresentation(BsonType.String)]
        public Guid Id { get; set; }
        public string Locality { get; set; }
        public string AreaLevelTwo { get; set; }
        public string AreaLevelOne { get; set; }
        public string Country { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public User Organizer { get; set; }
        public List<User> Participants { get; set; }
    }
}
