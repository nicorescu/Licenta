using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Routing;
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
    public class TripsController : ControllerBase
    {
        private ITripProcessor _tripProcessor;

        public TripsController(ITripProcessor tripProcessor)
        {
            _tripProcessor = tripProcessor;
        }

        [HttpGet("/trips")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<List<TripDto>>> GetAllTrips()
        {
            return await _tripProcessor.GetAllTrips();
        }

        [HttpGet("/trips/search")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<TripsResultDto>> SearchTrips([FromQuery] SearchFilter searchFilter)
        {
            return await _tripProcessor.SearchTrips(searchFilter);
        }

        [HttpGet("/trips/{tripId}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<TripDto>> GetTripById(Guid tripId)
        {
            return await _tripProcessor.GetTripById(tripId);
        }

        
        [HttpGet("/trips/selected/{tripId}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<SelectedTripResultDto>> GetSelectedTrip(Guid tripId)
        {
            return await _tripProcessor.GetSelectedTrip(tripId);
        }

        [HttpGet("/trips/user/as-organizer/{userId}")]
        [Authorize]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<List<TripDto>>> GetUsersOrganizedTrips([FromRoute] Guid userId, [FromQuery] int pageNumber)
        {
            return await _tripProcessor.GetUsersOrganizedTrips(userId, pageNumber, Response);
        }

        [HttpGet("/trips/user/as-participant/{userId}")]
        [Authorize]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<List<TripDto>>> GetUsersParticipatedTrips([FromRoute] Guid userId, [FromQuery] int pageNumber)
        {
            return await _tripProcessor.GetUsersParticipatedTrips(userId, pageNumber, Response);
        }

        [HttpGet("/trips/participation-requests/{tripId}")]
        [Authorize]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<List<UserDto>>> GetParticipationRequests([FromRoute] Guid tripId)
        {
            return await _tripProcessor.GetParticipationRequests(tripId);
        }

        [HttpPost("/trips")]
        [Authorize]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<bool>> AddTrip([FromBody] TripDto trip)
        {
            return await _tripProcessor.InsertNewTrip(trip);
        }

        [HttpPost("/trips/{tripId}/participants")]
        [Authorize]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<bool>> AddParticipant([FromRoute] Guid tripId, [FromBody] UserIdRequest participantIdRequest)
        {
            return await _tripProcessor.AddParticipant(tripId, participantIdRequest.UserId);
        }

        [HttpPost("/trips/{tripId}/participation-requests")]
        [Authorize]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<bool>> AddParticipationRequest([FromRoute] Guid tripId, [FromBody] UserIdRequest userIdRequest)
        {
            return await _tripProcessor.AddParticipationRequest(tripId, userIdRequest.UserId);
        }

        [HttpPut("/trips/{tripId}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<bool>> UpdateTrip([FromRoute] Guid tripId, [FromBody] TripDto trip)
        {
            return await _tripProcessor.UpdateTrip(tripId, trip);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("/trips/cancel/authority/{tripId}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<bool>> CancelTripByAuthority(Guid tripId)
        {
            return await _tripProcessor.CancelTripByAuthority(tripId);
        }

        [Authorize]
        [HttpPut("/trips/cancel/{tripId}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<bool>> CancelTrip([FromRoute] Guid tripId)
        {
            return await _tripProcessor.CancelTrip(tripId);
        }

        [Authorize]
        [HttpPut("/trips/state")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<bool>> UpdateTripsState()
        {
            return await _tripProcessor.UpdateTripsState();
        }

        [HttpDelete("/trips/{tripId}")]
        [Authorize]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<bool>> DeleteTrip(Guid tripId)
        {
            return await _tripProcessor.DeleteTrip(tripId);
        }

        [HttpDelete("/trips/{tripId}/participants")]
        [Authorize]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]

        public async Task<ActionResult<bool>> RemoveParticipant([FromRoute] Guid tripId, [FromQuery] Guid userId)
        {
            return await _tripProcessor.RemoveParticipant(tripId, userId);
        }

        [HttpDelete("/trips/{tripId}/participation-requests")]
        [Authorize]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<bool>> RemoveParticipationRequest([FromRoute] Guid tripId, [FromQuery] Guid userId)
        {
            return await _tripProcessor.RemoveParticipationRequest(tripId, userId);
        }
    }
}
