using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Core.Configuration;
using TripService.IntegrationTest.Resources;
using TripService.Setup;

namespace TripService.IntegrationTest.Fixtures
{
    public class DatabaseFixture : IDisposable
    {
        public IMongoClient Client;
        public DatabaseFixture()
        {
            Provider = GetProvider();
            MongoCollection = Provider.GetService<IMongoClient>()
                                .GetDatabase(StringResources.TestDatabaseName)
                                .GetCollection<BsonDocument>(StringResources.TripCollection);
        }

        public ServiceProvider Provider { get; set; }

        internal IMongoCollection<BsonDocument> MongoCollection { get; }
        public void Dispose()
        {

        }

        public static ServiceProvider GetProvider()
        {
            var configurationBuilder = new ConfigurationBuilder();
            configurationBuilder.AddJsonFile(StringResources.AppSettingsFileName);

            var configuration = configurationBuilder.Build();

            var services = new ServiceCollection();

            services.AddSingleton<IMongoClient, MongoClient>(services =>
            {
                return new MongoClient("mongodb+srv://teodor:123456qwe@cluster0.q0qsc.mongodb.net");
            });

            return services.BuildServiceProvider();
        }

    }
}
