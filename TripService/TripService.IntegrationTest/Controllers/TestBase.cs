using Microsoft.AspNetCore.Mvc.Testing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using TripService.IntegrationTest.Fixtures;
using Xunit;

namespace TripService.IntegrationTest.Controllers
{
    public class TestBase
    {

        protected HttpClient client;

        public TestBase(SetupFixture setupFixture)
        {
            SetupFixture = setupFixture;
            client = SetupFixture.Client = SetupFixture.CreateClient();
        }
        public SetupFixture SetupFixture { get; }
    }
}
