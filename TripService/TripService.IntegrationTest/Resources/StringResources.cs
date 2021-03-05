using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.IntegrationTest.Resources
{
    public static class StringResources
    {
        public const string ConnectionString = "mongodb+srv://teodor:123456qwe@cluster0.q0qsc.mongodb.net";
        public const string TestDatabaseName = "Trip_planning_integration_test";
        public const string TripCollection = "Trip";
        public const string AppSettingsFileName = "appsettings.json";
    }
}
