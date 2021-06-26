using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Models.Domain
{
    public class FullConversation
    {
        public User FirstUser { get; set; }
        public User SecondUser { get; set; }
        public List<Message> Messages { get; set; }
    }
}
