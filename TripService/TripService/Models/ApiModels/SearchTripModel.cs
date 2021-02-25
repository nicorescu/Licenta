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
        public string Locality { get; set; }
        public string AreaLevelTwo { get; set; }
        public string AreaLevelOne { get; set; }
        public string Country { get; set; }
        public bool FriendsOnly { get; set; }
    }
}
