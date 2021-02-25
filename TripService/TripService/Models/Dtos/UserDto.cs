using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Enumerators;
using TripService.Models.ApiModels;
using System.Runtime.Serialization;

namespace TripService.Models.Dtos
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime Birthday { get; set; }
        public string Country { get; set; }
        public string Role { get; set; }
        public List<UserDto> friends { get; set; }

    }
}
