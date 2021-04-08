using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Models.Domain
{
    public class Message
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string message { get; set; }
    }
}
