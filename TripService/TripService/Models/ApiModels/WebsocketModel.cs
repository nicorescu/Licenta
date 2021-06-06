using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Enumerators;

namespace TripService.Models.ApiModels
{
    public class WebsocketModel
    {
        public NotificationType NotificationType { get; set; }
        public Guid ForUser { get; set; }
    }
}
