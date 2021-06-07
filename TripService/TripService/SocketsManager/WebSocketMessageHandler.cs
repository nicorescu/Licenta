using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;

namespace TripService.SocketsManager
{
    public class WebSocketMessageHandler : SocketHandler
    {
        public WebSocketMessageHandler(ConnectionManager connections) : base(connections)
        {

        }

        public override async Task Receive(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            var socketId = Connections.GetId(socket);
            var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
            await SendMessage(socketId, message);
        }
    }
}

