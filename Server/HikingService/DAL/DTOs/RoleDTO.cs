using System;
using System.Collections.Generic;

#nullable disable

namespace HikingService.Models
{
    public partial class RoleDTO
    {
        public RoleDTO()
        {
            Users = new HashSet<UserDTO>();
        }

        public short Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<UserDTO> Users { get; set; }
    }
}
