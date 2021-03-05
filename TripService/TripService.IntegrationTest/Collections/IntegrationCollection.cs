using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.IntegrationTest.Fixtures;
using Xunit;

namespace TripService.IntegrationTest.Collections
{
    [CollectionDefinition("IntegrationCollection")]
    public class IntegrationCollection : ICollectionFixture<SetupFixture>, ICollectionFixture<DatabaseFixture>
    {
    }
}
