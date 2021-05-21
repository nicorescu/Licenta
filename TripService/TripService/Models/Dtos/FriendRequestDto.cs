using System;
using TripService.Enumerators;

namespace TripService.Models.Dtos
{
    public class FriendRequestDto
    {
        //User who sends the request
        public Guid UserId { get; set; }
        public RequestState State { get; set; } = RequestState.Pending;
        public bool Seen { get; set; } = false;
    }
}
