using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Models.Dtos
{
    public class TripsResultDto
    {
        public List<TripDto> Trips { get; set; }
        public int Count { get; set; }
    }
}
