using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Models.Dtos
{
    public class MessageDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string message { get; set; }
    }
}
