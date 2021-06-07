using System;
using TripService.Enumerators;

namespace TripService.Models.Dtos
{
    public class NotificationDto
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
