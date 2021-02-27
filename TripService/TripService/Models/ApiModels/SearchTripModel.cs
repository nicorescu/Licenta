using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Models.ApiModels
{
    public class SearchTripModel
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string[] Keywords { get; set; }
        public bool FriendsOnly { get; set; }
    }
}
