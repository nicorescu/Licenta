﻿using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Enumerators;

namespace TripService.Models.Domain
{
    public class Trip
    {
        public Guid Id { get; set; }
        public string LocationName { get; set; }
        public string Address { get; set; }
        public string FullAddress { get; set; }
        public string Country { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid OrganizerId { get; set; }
        public int SlotsNumber { get; set; }
        public List<Guid> ParticipantsIds { get; set; }
        public TripPrivacy Privacy { get; set; }
        public TripState State { get; set; }
        public List<Review> Reviews { get; set; }
        public List<Guid> Requests { get; set; } //ids of users requesting to participate
        public string ThumbnailReference { get; set; }

    }
}
