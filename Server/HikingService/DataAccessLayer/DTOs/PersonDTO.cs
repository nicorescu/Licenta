using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.DTOs
{
    public class PersonDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public List<AdressDTO> Adresses { get; set; } = new List<AdressDTO>();
        public List<EmailDTO> EmailAdresses { get; set; } = new List<EmailDTO>();
    }
}
