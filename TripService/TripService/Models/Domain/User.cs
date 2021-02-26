using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Enumerators;
using TripService.Models.ApiModels;

namespace TripService.Models.Domain
{
    public class User
    {
        [BsonRepresentation(BsonType.String)]
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email {get;set;}
        public string Password { get; set; }
        public DateTime Birthday { get; set; }
        public string Country { get; set; }
        public Role role { get; set; }
        public List<User> friends { get; set; }


    }
}
