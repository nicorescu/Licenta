using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Enumerators;

namespace TripService.Models.Domain
{
    public class Notification
    {
        public Guid NotifierId { get; set; }
        public Guid TripId { get; set; }
        public string UserFullName { get; set; }
        public string TripAddress { get; set; }
        public NotificationType NotificationType { get; set; }
        public bool Seen { get; set; }
        public DateTime SentAt { get; set; }
    }
}
