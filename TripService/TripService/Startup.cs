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
using System.Net.Http;
using TripService.SocketsManager;
using TripService.SignalR;

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

            services.AddWebSocketManager();

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

            services.AddSignalR(options =>
            {
                options.EnableDetailedErrors = true;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }



            app.UseHttpsRedirection();
            app.UseCors("CorsPolicy");
            app.UseCors("EnableCORS");
            app.UseCors("AllowAllHeaders");

            app.UseWebSockets();
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
                endpoints.MapHub<SignalRHub>("/signalr/{id}");
            });

            app.UseSwagger();

            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "Swagger Demo API");
                options.RoutePrefix = "";
            });

            app.UseDeveloperExceptionPage();


            // app.MapWebSockets("/ws", serviceProvider.GetService<WebSocketMessageHandler>());

            /*app.Use(async (http, next) =>
            {

                if (http.WebSockets.IsWebSocketRequest)
                {
                    if (http.Request.Path.StartsWithSegments("/ws"))
                    {
                        var receivedSocket = await http.WebSockets.AcceptWebSocketAsync();
                        var added = Program.sockets.GetOrAdd(http.Request.Path, receivedSocket);

                        var x = Program.sockets.FirstOrDefault(x => x.Key.Equals(http.Request.Path));
                        await Task.Run(async () =>
                        {
                            var socket = Program.sockets.FirstOrDefault(x => x.Key.Equals(http.Request.Path));
                            while (socket.Value.State == WebSocketState.Open)
                            {
                                byte[] bt = new byte[1024];
                                WebSocketReceiveResult rc = await socket.Value.ReceiveAsync(bt, CancellationToken.None);
                                string txt = Encoding.UTF8.GetString(bt);
                                await socket.Value.SendAsync(Encoding.UTF8.GetBytes(txt), WebSocketMessageType.Text, true, CancellationToken.None);
                            }
                        });
                    }
                    else
                    {
                        http.Response.StatusCode = 400;
                    }

                }
                else
                {
                    await next();
                }
            });*/

        }
    }
}
