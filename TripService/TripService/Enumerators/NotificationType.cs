using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Enumerators
{
    public enum NotificationType
    {
        UserJoinedTrip,
        UserLeftTrip,
        UserAskedApproval,
        OrganizerApprovedRequest,
        OrganizerCanceledTrip
    }
}
