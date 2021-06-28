using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Models.Domain
{
    public class FullConversation
    {
        public Guid Id { get; set; }
        public User FirstUser { get; set; }
        public User SecondUser { get; set; }
        public List<UserMessage> Messages { get; set; }
        public List<Guid> SeenBy { get; set; }

    }
}
