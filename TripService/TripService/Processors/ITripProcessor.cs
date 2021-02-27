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
        Task<List<TripDto>> GetAllTrips();
        Task<List<TripDto>> GetBestTripMatches(SearchTripModel searchTrip);
        Task<TripDto> GetTripById(Guid tripId);

        Task<bool> InsertNewTrip(TripDto trip);
        Task<bool> UpdateTrip(Guid tripId, TripDto trip);
        Task<bool> DeleteTrip(Guid tripId);
    }
}
