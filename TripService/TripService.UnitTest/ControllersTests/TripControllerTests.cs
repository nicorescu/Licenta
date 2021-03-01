using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Shouldly;
using TripService.Controllers;
using TripService.Models.Dtos;
using TripService.Processors;
using Xunit;


namespace TripService.UnitTest.ControllersTests
{
    public class TripControllerTests
    {
        private Mock<ITripProcessor> _tripProcessorMock;
        private TripsController _tripController;

        public TripControllerTests()
        {
            _tripProcessorMock = new Mock<ITripProcessor>();
            _tripController = new TripsController(_tripProcessorMock.Object); ;
        }

        [Fact]
        public async void GetAllTrips_Return_Not_Found_Test()
        {
            var trips = new List<TripDto>();
            _tripProcessorMock.Setup(x => x.GetAllTrips()).ReturnsAsync(trips);

            var result =await _tripController.GetAllTrips();
            result.ShouldBeOfType<NotFoundObjectResult>();
        }

        [Fact]
        public async void GetAllTrips_Return_OK_Test()
        {
            var trips = new List<TripDto>();
            trips.Add(new TripDto());
            _tripProcessorMock.Setup(x => x.GetAllTrips()).ReturnsAsync(trips);

            var result = await _tripController.GetAllTrips();
            result.ShouldBeOfType<OkObjectResult>();
        }

    }
}
