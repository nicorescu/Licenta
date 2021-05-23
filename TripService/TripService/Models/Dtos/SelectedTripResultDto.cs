using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Models.Dtos
{
    public class SelectedTripResultDto
    {
        public TripDto Trip { get; set; }
        public UserDto Organizer { get; set; }
        public List<UserDto> Participants { get; set; }
    }
}
