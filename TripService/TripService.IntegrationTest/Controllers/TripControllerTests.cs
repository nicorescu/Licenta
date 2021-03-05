using Microsoft.AspNetCore.Mvc.Testing;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using TripService.IntegrationTest.Fixtures;
using TripService.IntegrationTest.Resources;
using TripService.Models.Domain;
using Xunit;

namespace TripService.IntegrationTest.Controllers
{
    [Collection("IntegrationCollection")]
    public class TripControllerTests : TestBase
    {
        public TripControllerTests(SetupFixture setupFixture) : base(setupFixture)
        {
        }

        [Theory]
        [InlineData("/")]
        public async void GetSwaggerRequest(string url)
        {
            HttpResponseMessage response = await client.GetAsync(url);
            response.EnsureSuccessStatusCode();
            Assert.Equal("text/html; charset=utf-8",
                response.Content.Headers.ContentType.ToString());
        }

        [Theory]
        [InlineData("/trips")]
        public async void GetAllTripsRequest(string url)
        {
            HttpResponseMessage response = await client.GetAsync(url);
            Assert.Equal("application/json; charset=utf-8",
                response.Content.Headers.ContentType.ToString());
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Theory]
        [InlineData("/trips")]
        public async void PostTripRequest_OK(string url)
        {
            Trip trip = new Trip();

            var tripContent = JsonConvert.SerializeObject(trip);
            var buffer = System.Text.Encoding.UTF8.GetBytes(tripContent);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            HttpResponseMessage okResponse = await client.PostAsync(url, byteContent);

            Assert.Equal(HttpStatusCode.OK, okResponse.StatusCode);
        }

        [Theory]
        [InlineData("/trips")]
        public async void PostTripRequest_ERROR(string url)
        {
            Trip trip = new Trip();
            trip.Id = Guid.Parse("3fa85f64-5717-4562-b3fc-2c963f66afa9"); //This is an already existing id in the database
            var tripContent = JsonConvert.SerializeObject(trip);
            var buffer = System.Text.Encoding.UTF8.GetBytes(tripContent);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            HttpResponseMessage okResponse = await client.PostAsync(url, byteContent);

            Assert.Equal(HttpStatusCode.BadRequest, okResponse.StatusCode);
        }
    }
}
