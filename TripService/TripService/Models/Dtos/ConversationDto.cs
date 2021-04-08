using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Models.Dtos
{
    public class ConversationDto
    {
        public Guid Id { get; set; }
        public Guid FriendId { get; set; }
        public List<MessageDto> Messages { get; set; }
    }
}
