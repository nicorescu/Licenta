using System;
using TripService.Enumerators;

namespace TripService.Models.Domain
{
    public class TripRequest
    {
        //User who sends the request
        public Guid UserId { get; set; }
        public Guid TripId { get; set; }
        public RequestState State { get; set; }
        public bool Seen { get; set; }
    }
}
