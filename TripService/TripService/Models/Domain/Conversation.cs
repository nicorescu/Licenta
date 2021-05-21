using System;
using System.Collections.Generic;

namespace TripService.Models.Domain
{
    public class Conversation
    {
        public Guid Id { get; set; }
        public Guid FriendId { get; set; }
        public List<Message> Messages { get; set; }
    }
}
