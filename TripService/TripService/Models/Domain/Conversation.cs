using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace TripService.Models.Domain
{
    [BsonIgnoreExtraElements]
    public class Conversation
    {
        public Guid Id { get; set; }
        public Guid FirstUserId { get; set; }
        public Guid SecondUserId { get; set; }
        public List<UserMessage> Messages { get; set; }
    }
}
