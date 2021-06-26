using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Models.Dtos
{
    public class FullConversationDto
    {
        public UserDto FirstUser { get; set; }
        public UserDto SecondUser { get; set; }
        public List<MessageDto> Messages { get; set; }
    }
}
