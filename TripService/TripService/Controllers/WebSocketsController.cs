/*using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace TripService.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class WebSocketsController : ControllerBase
    {
        private readonly ILogger<WebSocketsController> _logger;
        private static ConcurrentDictionary<string, WebSocket> _sockets;

        public WebSocketsController(ILogger<WebSocketsController> logger)
        {
            _logger = logger;
            _sockets = new ConcurrentDictionary<string, WebSocket>();
        }

        [HttpGet("/ws")]
        public async Task Get()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                _logger.Log(LogLevel.Information, "WebSocket connection established");
                await Echo(webSocket);
            }
            else
            {
                HttpContext.Response.StatusCode = 400;
            }
        }

        [HttpGet("/ws/notifications/{userId}")]
        public async Task GetWs(Guid userId)
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                _logger.Log(LogLevel.Information, "WebSocket connection established");
                if (webSocket.State == WebSocketState.Open)
                {
                    byte[] bt = new byte[1024];
                    WebSocketReceiveResult rc = await webSocket.ReceiveAsync(bt, CancellationToken.None);
                    string txt = Encoding.UTF8.GetString(bt);
                    var x = Request.Path;
                    if (txt.Contains("register"))
                    {
                        _sockets.TryAdd(Request.Path, webSocket);
                    }
                }
                var socket = _sockets.FirstOrDefault(x => x.Key.Equals(Request.Path)).Value;
                var y = socket?.State;
                await Task.Run(async () =>
                {
                    while (socket != null && socket.State == WebSocketState.Open)
                    {
                        byte[] bt = new byte[1024];
                        WebSocketReceiveResult rc = await socket.ReceiveAsync(bt, CancellationToken.None);
                        string txt = Encoding.UTF8.GetString(bt);
                        await socket.SendAsync(Encoding.UTF8.GetBytes(txt), WebSocketMessageType.Text, true, CancellationToken.None);
                    }
                });
            }
            else
            {
                HttpContext.Response.StatusCode = 400;
            }
        }

        private async Task Echo(WebSocket webSocket)
        {
            var buffer = new byte[1024 * 4];
            var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            _logger.Log(LogLevel.Information, "Message received from Client");

            while (!result.CloseStatus.HasValue)
            {
                var serverMsg = Encoding.UTF8.GetBytes($"Server: Hello. You said: {Encoding.UTF8.GetString(buffer)}");
                await webSocket.SendAsync(new ArraySegment<byte>(serverMsg, 0, serverMsg.Length), result.MessageType, result.EndOfMessage, CancellationToken.None);
                _logger.Log(LogLevel.Information, "Message sent to Client");

                result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                _logger.Log(LogLevel.Information, "Message received from Client");

            }
            await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
            _logger.Log(LogLevel.Information, "WebSocket connection closed");
        }

    }
}
*/