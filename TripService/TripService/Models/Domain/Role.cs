using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Models.Domain
{
    public class Role
    {
        public Guid Id { get; set; }
        public string RoleName { get; set; }
    }
}
