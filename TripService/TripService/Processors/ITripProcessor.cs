using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Models.ApiModels;
using TripService.Models.Dtos;

namespace TripService.Processors
{
    public interface ITripProcessor
    {
        Task<ActionResult<List<TripDto>>> GetAllTrips();
        Task<ActionResult<List<TripDto>>> SearchTrips(SearchFilter searchFilter);
        Task<ActionResult<TripDto>> GetTripById(Guid tripId);

        Task<ActionResult<bool>> InsertNewTrip(TripDto trip);
        Task<ActionResult<bool>> CancelTripByAuthority(Guid tripId);
        Task<ActionResult<bool>> UpdateTrip(Guid tripId, TripDto trip);
        Task<ActionResult<bool>> DeleteTrip(Guid tripId);
    }
}
