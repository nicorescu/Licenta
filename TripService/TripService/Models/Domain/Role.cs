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
        [BsonRepresentation(BsonType.String)]
        public Guid Id { get; set; }
        public string Authority { get; set; }
    }
}
