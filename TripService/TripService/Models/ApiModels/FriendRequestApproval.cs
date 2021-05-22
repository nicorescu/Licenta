using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Models.ApiModels
{
    public class FriendRequestApproval
    {
        public Guid RequestedUserId { get; set; }
        public Guid RequesterUserId { get; set; }

    }
}
