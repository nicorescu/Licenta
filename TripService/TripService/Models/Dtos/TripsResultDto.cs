﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Models.Dtos
{
    public class TripsResultDto
    {
        public List<DetailedTripDto> Trips { get; set; }
        public int Count { get; set; }
    }
}
