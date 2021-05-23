using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Models.Domain
{
    public class SelectedTripResult
    {
        public Trip Trip { get; set; }
        public User Organizer { get; set; }
        public List<User> Participants { get; set; }
    }
}
