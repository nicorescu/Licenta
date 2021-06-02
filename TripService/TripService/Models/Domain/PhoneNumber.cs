using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Models.Domain
{
    public class PhoneNumber
    {
        public string CountryCode { get; set; }
        public string DialCode { get; set; }
        public string E164Number { get; set; }
        public string InternationalNumber { get; set; }
        public string NationalNumber { get; set; }
        public string Number { get; set; }
    }
}
