using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading.Tasks;
using TripService.Models.Dtos;

namespace TripService.SignalR
{
    public class SignalRHub : Hub
    {
        private static ConcurrentDictionary<string, string> _connections = new ConcurrentDictionary<string, string>();

        public async Task NotifyFriendRequest(string userId)
        {
            var connectionId = _connections.FirstOrDefault(x => x.Key.Equals(userId)).Value;
            if (connectionId != null)
            {
                await Clients.Client(connectionId).SendAsync("FriendRequestReceived");
            }
        }

        public async Task NotifyFriendRequestApproved(string userId,string id, string name)
        {
            var connectionId = _connections.FirstOrDefault(x => x.Key.Equals(userId)).Value;
            if (connectionId != null)
            {
                await Clients.Client(connectionId).SendAsync("FriendRequestApproved",id,name);
            }
        }

        public async Task NotifyFriendRequestCanceled(string userId, string requesterId)
        {
            var connectionId = _connections.FirstOrDefault(x => x.Key.Equals(userId)).Value;
            if (connectionId != null)
            {
                await Clients.Client(connectionId).SendAsync("FriendRequestCanceled", requesterId);
            }
        }

        public async Task SendNotification(string userId, NotificationDto notification)
        {
            var connectionId = _connections.FirstOrDefault(x => x.Key.Equals(userId)).Value;
            if (connectionId != null)
            {
                await Clients.Client(connectionId).SendAsync("NotificationReceived", notification);
            }
        }

        public override async Task OnConnectedAsync()
        {
            var requestPath = Context.GetHttpContext().Request.Path;
            var userId = requestPath.ToString().Replace("/signalr/", string.Empty);
            _connections.AddOrUpdate(userId,Context.ConnectionId, (x,y) => Context.ConnectionId);
            await base.OnConnectedAsync();
        }

    }
}
