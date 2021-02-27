using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Models.ApiModels;
using TripService.Models.Domain;
using TripService.Models.Dtos;
using TripService.Repositories;

namespace TripService.Processors
{
    public class TripProcessor : ITripProcessor
    {
        private readonly ITripRepository _tripRepository;
        private readonly IMapper _mapper;
        public TripProcessor(ITripRepository TripDtoRepository, IMapper mapper)
        {
            _tripRepository = TripDtoRepository;
            _mapper = mapper;
        }
        public async Task<List<TripDto>> GetAllTrips()
        {
            List<Trip> result = await _tripRepository.GetAllTrips();

            return _mapper.Map<List<TripDto>>(result);
        }
        public async Task<List<TripDto>> GetBestTripMatches(SearchTripModel searchTrip)
        {
            List<Trip> result = await _tripRepository.GetBestTripMatches(searchTrip);
            return _mapper.Map<List<TripDto>>(result);
        }
        public async Task<TripDto> GetTripById(Guid tripId)
        {
            Trip result = await _tripRepository.GetTripById(tripId);

            return _mapper.Map<TripDto>(result);
        }

        public async Task<bool> InsertNewTrip(TripDto tripDto)
        {
            Trip trip = _mapper.Map<Trip>(tripDto);
            return await _tripRepository.InsertNewTrip(trip);
        }

        public async Task<bool> UpdateTrip(Guid tripId, TripDto tripDto)
        {
            Trip trip = _mapper.Map<Trip>(tripDto);
            return await _tripRepository.UpdateTrip(tripId, trip);
        }

        public async Task<bool> DeleteTrip(Guid tripId)
        {
            return await _tripRepository.DeleteTrip(tripId);
        }
    }
}
