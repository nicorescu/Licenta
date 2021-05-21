﻿using System;
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
        Task<Tuple<List<Trip>, int>> SearchTrips(SearchFilter searchFilter);
        Task<Trip> GetTripById(Guid tripId);

        Task<bool> InsertNewTrip(Trip trip);
        Task<bool> CancelTripByAuthority(Guid tripId);
        Task<bool> UpdateTrip(Guid tripId, Trip trip);
        Task<bool> DeleteTrip(Guid tripId);

        Task<bool> AddParticipant(Guid tripId, Guid participantId);
    }
}
