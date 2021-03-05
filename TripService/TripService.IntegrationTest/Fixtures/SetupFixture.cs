using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using TripService.IntegrationTest.Resources;
using Microsoft.Extensions.DependencyInjection;


namespace TripService.IntegrationTest.Fixtures
{
    public class SetupFixture : WebApplicationFactory<Startup>
    {
        public HttpClient Client;
        private IHost _host;
        public IConfigurationRoot Configuration;

        public SetupFixture()
        {
        }

        protected override IHost CreateHost(IHostBuilder builder)
        {
            _host = builder.StartAsync(CancellationToken.None).GetAwaiter().GetResult();
            return _host;
        }

        protected override IHostBuilder CreateHostBuilder()
        {
            var path = Uri.UnescapeDataString(new UriBuilder(Assembly.GetExecutingAssembly().CodeBase).Path);
            var assemblyPath = Path.GetDirectoryName(path);

            Configuration = new ConfigurationBuilder()
                .SetBasePath(assemblyPath)
                .AddJsonFile(StringResources.AppSettingsFileName, false, true)
                .AddEnvironmentVariables()
                .Build();

            return Host
                .CreateDefaultBuilder()
                .ConfigureWebHostDefaults(web =>
                {
                    web
                        .UseConfiguration(Configuration)
                        .UseStartup<Startup>()
                        .ConfigureServices(services =>
                        {
                            // use use a TestStartup to inject some mocks and stubs.
                            //  It will not work without this line.  The root folder is derived from the assembly
                            //  startup is in without this.
                            services
                                .AddControllers()
                                .AddApplicationPart(typeof(Startup).Assembly);
                        });
                });
        }

        protected override void Dispose(bool disposing)
        {
        }
    }
}
