using System;
using System.Collections.Generic;

#nullable disable

namespace HikingService.Models
{
    public partial class UserDTO
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Birthday { get; set; }
        public string Country { get; set; }
        public short? RoleId { get; set; }

        public virtual RoleDTO Role { get; set; }
    }
}
