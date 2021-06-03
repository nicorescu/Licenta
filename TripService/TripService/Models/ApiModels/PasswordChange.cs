using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Models.ApiModels
{
    public class PasswordChange
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
