using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Models.ApiModels
{
    public class SearchFilter
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid RequesterId { get; set; }
        public string Keywords { get; set; }
        public bool WholeCountry { get; set; }
        public bool FriendsOnly { get; set; }
        public int RequestedPage { get; set; }
        public int PageSize { get; set; }
        public string Location { get; set; }
        public string Country { get; set; }
    }
}
