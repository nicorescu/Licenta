using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Models.Dtos
{
    public class TripDto
    {
        public Guid Id { get; set; }
        public string Locality { get; set; }
        public string AreaLevelTwo { get; set; }
        public string AreaLevelOne { get; set; }
        public string Country { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public UserDto Organizer { get; set; }
        public List<UserDto> Participants { get; set; }
    }
}
