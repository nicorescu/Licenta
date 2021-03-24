using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Enumerators;

namespace TripService.Models.ApiModels
{
    public class CredentialsModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public ProviderEnum AccountProvider { get; set; }
    }
}
