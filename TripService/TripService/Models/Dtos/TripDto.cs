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
        public string FullAddress { get; set; }
        public string Country { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid OrganizerId { get; set; }
        public int SlotsNumber { get; set; }
        public List<Guid> ParticipantsIds { get; set; }
        public TripPrivacy Privacy { get; set; }
        public TripState State { get; set; }
        public List<ReviewDto> Reviews { get; set; }
        public double ReviewAverage { get; set; }
        public string ThumbnailReference { get; set; }

    }
}
