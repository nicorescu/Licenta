using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using TripService.Setup;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Mvc.Formatters;
using MongoDB.Bson;
using Microsoft.AspNetCore.Http.Features;
using System.IO;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Http;
using System.Net.WebSockets;
using System.Threading;
using System.Text;

namespace TripService
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers(options =>
            {
                options.OutputFormatters.RemoveType<StringOutputFormatter>();
            }).AddNewtonsoftJson(options =>
            {
                options.UseCamelCasing(true);
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            });

            BsonDefaults.GuidRepresentation = GuidRepresentation.Standard;


            services.AddSingleton<IMongoClient, MongoClient>(services =>
            {
                var uri = services.GetRequiredService<IConfiguration>()["MongoUri"];
                return new MongoClient(uri);
            });

            services.Configure<FormOptions>(o =>
            {
                o.ValueLengthLimit = int.MaxValue;
                o.MultipartBodyLengthLimit = int.MaxValue;
                o.MemoryBufferThreshold = int.MaxValue;
            });

            ServiceCollectionSetup.AddAuthentication(services);
            ServiceCollectionSetup.AddAutomapper(services);
            ServiceCollectionSetup.AddCors(services);
            ServiceCollectionSetup.AddSwagger(services);
            ServiceCollectionSetup.TryAddAllServices(services);
            ServiceCollectionSetup.TryAddMongoConnection(services);
            ServiceCollectionSetup.AddCors(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }



            app.UseHttpsRedirection();

            app.UseCors("EnableCORS");
            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Files")),
                RequestPath = new PathString("/Files")
            });

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();

            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "Swagger Demo API");
                options.RoutePrefix = "";
            });

            app.UseDeveloperExceptionPage();

            app.UseWebSockets();
            app.Use(async (http, next) =>
            {
                if (http.WebSockets.IsWebSocketRequest && http.Request.Path == "/ws/friendRequestsWs")
                {
                    Program.FriendRequestsWb = await http.WebSockets.AcceptWebSocketAsync();
                    await Task.Run(async () =>
                    {
                        while (Program.FriendRequestsWb.State == WebSocketState.Open)
                        {
                            byte[] bt = new byte[1024];
                            WebSocketReceiveResult rc = await Program.FriendRequestsWb.ReceiveAsync(bt, CancellationToken.None);
                            string txt = Encoding.UTF8.GetString(bt);
                            await Program.FriendRequestsWb.SendAsync(Encoding.UTF8.GetBytes(txt), WebSocketMessageType.Text, true, CancellationToken.None);
                        }
                    });
                }
                else if (http.WebSockets.IsWebSocketRequest && http.Request.Path == "/ws/notificationsWs")
                {
                    Program.NotificationsWb = await http.WebSockets.AcceptWebSocketAsync();
                    await Task.Run(async () =>
                    {
                        while (Program.NotificationsWb.State == WebSocketState.Open)
                        {
                            byte[] bt = new byte[1024];
                            WebSocketReceiveResult rc = await Program.NotificationsWb.ReceiveAsync(bt, CancellationToken.None);
                            string txt = Encoding.UTF8.GetString(bt);
                            await Program.NotificationsWb.SendAsync(Encoding.UTF8.GetBytes(txt), WebSocketMessageType.Text, true, CancellationToken.None);
                        }
                    });
                }
                else if (http.WebSockets.IsWebSocketRequest && http.Request.Path == "/ws/messagesWs")
                {
                    Program.MessagesWb = await http.WebSockets.AcceptWebSocketAsync();
                    await Task.Run(async () =>
                    {
                        while (Program.MessagesWb.State == WebSocketState.Open)
                        {
                            byte[] bt = new byte[1024];
                            WebSocketReceiveResult rc = await Program.MessagesWb.ReceiveAsync(bt, CancellationToken.None);
                            string txt = Encoding.UTF8.GetString(bt);
                            await Program.MessagesWb.SendAsync(Encoding.UTF8.GetBytes(txt), WebSocketMessageType.Text, true, CancellationToken.None);
                        }
                    });
                }
                else
                {
                    await next();
                }
            });
        }
    }
}
