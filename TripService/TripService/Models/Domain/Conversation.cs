using System;
using System.Collections.Generic;

namespace TripService.Models.Domain
{
    public class Conversation
    {
        public Guid FirstUserId { get; set; }
        public Guid SecondUserId { get; set; }
        public List<Message> Messages { get; set; }
    }
}
