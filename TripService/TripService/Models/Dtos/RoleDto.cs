using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Models.Dtos
{
    public class RoleDto
    {
        public Guid Id { get; set; }
        public string Authority { get; set; }
    }
}
