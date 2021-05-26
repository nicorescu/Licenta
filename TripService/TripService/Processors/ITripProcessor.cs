using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TripService.Models.ApiModels;
using TripService.Models.Dtos;

namespace TripService.Processors
{
    public interface ITripProcessor
    {
        Task<ActionResult<List<TripDto>>> GetAllTrips();
        Task<ActionResult<TripsResultDto>> SearchTrips(SearchFilter searchFilter);
        Task<ActionResult<TripDto>> GetTripById(Guid tripId);
        Task<ActionResult<SelectedTripResultDto>> GetSelectedTrip(Guid tripId);
        Task<ActionResult<bool>> InsertNewTrip(TripDto trip);
        Task<ActionResult<bool>> CancelTripByAuthority(Guid tripId);
        Task<ActionResult<bool>> UpdateTrip(Guid tripId, TripDto trip);
        Task<ActionResult<bool>> DeleteTrip(Guid tripId);
        Task<ActionResult<bool>> AddParticipant(Guid tripId, Guid participantId);
        Task<ActionResult<bool>> AddParticipationRequest(Guid tripId, Guid userId);
        Task<ActionResult<bool>> RemoveParticipationRequest(Guid tripId, Guid userId);
        Task<ActionResult<bool>> RemoveParticipant(Guid tripId, Guid userId);
    }
}
