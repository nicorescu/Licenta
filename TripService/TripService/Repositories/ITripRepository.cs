using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Models.ApiModels;
using TripService.Models.Domain;

namespace TripService.Repositories
{
    public interface ITripRepository
    {
        Task<List<Trip>> GetAllTrips();
        Task<List<Trip>> GetBestTripMatches(SearchTripModel searchModel);
        Task<Trip> GetTripById(Guid tripId);

        Task<bool> InsertNewTrip(Trip trip);
        Task<bool> DeleteTrip(Guid tripId);
        
    }
}
