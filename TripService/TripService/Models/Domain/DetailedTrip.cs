using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Models.Domain
{
    public class DetailedTrip
    {
        public Trip Trip { get; set; }
        public User Organizer { get; set; }
    }
}
