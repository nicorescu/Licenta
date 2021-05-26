using System.Collections.Generic;

namespace TripService.Models.Domain
{
    public class SelectedTripResult
    {
        public Trip Trip { get; set; }
        public User Organizer { get; set; }
        public List<User> Participants { get; set; }
    }
}
