using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Models.Dtos
{
    public class FullConversationDto
    {
        public Guid Id { get; set; }
        public UserDto FirstUser { get; set; }
        public UserDto SecondUser { get; set; }
        public List<UserMessageDto> Messages { get; set; }
        public List<Guid> SeenBy { get; set; }

    }
}
