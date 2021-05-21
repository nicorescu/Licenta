using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Enumerators;

namespace TripService.Models.Dtos
{
    public class ApprovalRequestDto
    {
        
        public Guid UserId { get; set; } //User who sends the request
        public Guid TripId { get; set; }
        public RequestState State { get; set; } = RequestState.Pending;
        public bool Seen { get; set; } = false;
    }
}
