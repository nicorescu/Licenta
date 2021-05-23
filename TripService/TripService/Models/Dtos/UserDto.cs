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
        public Guid Id { get; set; } = Guid.NewGuid();
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string Country { get; set; }
        public string CountryCode { get; set; }
        public ProviderEnum AccountProvider { get; set; }
        public DateTime Birthday { get; set; }
        public int Age { get; set; }
        public RoleEnum Role { get; set; }
        public List<Guid> Friends { get; set; }
        public List<ConversationDto> Conversations { get; set; }
        public List<ReviewDto> Reviews { get; set; }
        public double ReviewAverage { get; set; }
        public List<ApprovalRequestDto> ApprovalRequests { get; set; }
        public List<Guid> FriendRequests { get; set; }

    }
}
