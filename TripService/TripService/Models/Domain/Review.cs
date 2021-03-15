using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Models.Domain
{
    public class Review
    {
        public Guid Id { get; set; }
        public User Author { get; set; }
        public string Message { get; set; }
        public int Stars { get; set; }
    }
}
