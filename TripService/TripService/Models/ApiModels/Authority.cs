using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Enumerators;

namespace TripService.Models.ApiModels
{
    public class Authority
    {
        public Guid Id { get; set; }
        public string role { get; set; }
    }
}
