using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace TripService
{
    public class Program
    {
        public static WebSocket NotificationsWb = null;
        public static WebSocket FriendRequestsWb = null;
        public static WebSocket MessagesWb = null;
        public static ConcurrentDictionary<string,WebSocket> sockets = new ConcurrentDictionary<string,WebSocket>();

        public static CancellationToken CancelationToken { get; private set; }

        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();

           // StartWebsockets().GetAwaiter().GetResult();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });

        public static async Task StartWebsockets()
        {
            var client = new ClientWebSocket();
            await client.ConnectAsync(new Uri("wss://localhost:5001/ws"), CancellationToken.None);
            Console.WriteLine($"Web socket connection established @ {DateTime.UtcNow:F}");
            var send = Task.Run(async () =>
            {
                string message;
                while ((message = Console.ReadLine()) != null && message != string.Empty)
                {
                    var bytes = Encoding.UTF8.GetBytes(message);
                    await client.SendAsync(new ArraySegment<byte>(bytes), WebSocketMessageType.Text, true, CancellationToken.None);
                }
                await client.CloseOutputAsync(WebSocketCloseStatus.NormalClosure, "", CancellationToken.None);
            });
            var receive = ReceiveAsync(client);
            await Task.WhenAll(send, receive);

        }

        public static async Task ReceiveAsync(ClientWebSocket client)
        {
            var buffer = new byte[1024*4];

            while (true)
            {
                var result =await client.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                Console.WriteLine(Encoding.UTF8.GetString(buffer, 0, result.Count));
                if (result.MessageType == WebSocketMessageType.Close)
                {
                    await client.CloseOutputAsync(WebSocketCloseStatus.NormalClosure,"",CancellationToken.None);
                    break;
                }
            }
        }
    }
}
