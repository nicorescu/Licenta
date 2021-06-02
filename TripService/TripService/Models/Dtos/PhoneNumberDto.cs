using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Models.Dtos
{
    public class PhoneNumberDto
    {
        public string CountryCode { get; set; }
        public string DialCode { get; set; }
        public string E164Number { get; set; }
        public string InternationalNumber { get; set; }
        public string NationalNumber { get; set; }
        public string Number { get; set; }
    }
}
