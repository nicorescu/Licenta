using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Models.Domain
{
    public class Conversation
    {
        public Guid Id { get; set; }
        public Guid FriendId { get; set; }
        public List<Message> Messages { get; set; }
    }
}
