using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TripService.Models.ApiModels;
using TripService.Models.Dtos;
using TripService.Processors;

namespace TripService.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class TripsController : Controller
    {
        private ITripProcessor _tripProcessor;

        public TripsController(ITripProcessor tripProcessor)
        {
            _tripProcessor = tripProcessor;
        }


        [ProducesResponseType(typeof(List<TripDto>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [HttpGet("/trips")]
        public async Task<IActionResult> GetAllTrips()
        {
            List<TripDto> result = await _tripProcessor.GetAllTrips();

            if (result.Count == 0)
            {
                return NotFound("No trip found");
            }

            return Ok(result);
        }

        [ProducesResponseType(typeof(List<TripDto>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [HttpGet("/trips/search")]
        public async Task<IActionResult> GetMatchingTrips([FromQuery] SearchTripModel searchTrip)
        {
            List<TripDto> result = await _tripProcessor.GetBestTripMatches(searchTrip);

            if (result.Count == 0)
            {
                return NotFound("No trip found");
            }

            return Ok(result);
        }

        [ProducesResponseType(typeof(List<TripDto>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [HttpGet("{tripId}")]
        public async Task<IActionResult> GetTripById(Guid tripId)
        {
            TripDto result = await _tripProcessor.GetTripById(tripId);

            if (result == null)
            {
                return NotFound(result);
            }
            return Ok(result);
        }

        [ProducesResponseType(typeof(List<TripDto>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [HttpPost("/trips")]
        public async Task<IActionResult> AddTrip([FromBody] TripDto trip)
        {
            bool result = await _tripProcessor.InsertNewTrip(trip);

            if (!result)
            {
                return BadRequest("Couldn't insert trip");
            }

            return Ok(result);
        }

        [ProducesResponseType(typeof(List<TripDto>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [HttpPut("{tripId}")]
        public async Task<IActionResult> UpdateTrip([FromRoute] Guid tripId, [FromBody] TripDto trip)
        {
            bool result = await _tripProcessor.UpdateTrip(tripId, trip);

            if (!result)
            {
                return BadRequest("Couldn't update trip");
            }

            return Ok(result);
        }

        [ProducesResponseType(typeof(List<TripDto>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [HttpDelete("{tripId}")]
        public async Task<IActionResult> DeleteTrip(Guid tripId)
        {
            bool result = await _tripProcessor.DeleteTrip(tripId);

            if (!result)
            {
                return BadRequest("User couldn't be deleted");
            }

            return Ok(result);
        }
    }
}
