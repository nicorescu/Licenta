using System;
using System.Collections.Generic;
using TripService.Enumerators;

namespace TripService.Models.Domain
{
    public class User
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public PhoneNumber PhoneNumber { get; set; }
        public string Country { get; set; }
        public string CountryCode { get; set; }
        public string ProfilePicturePath { get; set; }
        public ProviderEnum AccountProvider { get; set; }
        public DateTime Birthday { get; set; }
        public RoleEnum Role { get; set; }
        public List<Guid> Friends { get; set; }
        public List<Conversation> Conversations { get; set; }
        public List<Review> Reviews { get; set; }
        public List<Guid> FriendRequests { get; set; }
        public bool PublicProfile { get; set; }
    }
}
