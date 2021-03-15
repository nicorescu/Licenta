using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Enumerators;

namespace TripService.Models.Dtos
{
    public class TripDto
    {
        public Guid Id { get; set; }
        public string LocationName { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public UserDto Organizer { get; set; }
        public List<UserDto> Participants { get; set; }
        public TripPrivacy Privacy { get; set; }
        public TripState State { get; set; }
        public List<ReviewDto> Reviews { get; set; }
        public double ReviewAverage { get; set; }
    }
}
