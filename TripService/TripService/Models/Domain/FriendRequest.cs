using System;
using TripService.Enumerators;

namespace TripService.Models.Domain
{
    public class FriendRequest
    {
        //User who sends the request
        public Guid UserId { get; set; }
        public RequestState State { get; set; }
        public bool Seen { get; set; }
    }
}
