﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
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
        public TripProcessor(ITripRepository tripRepository, IMapper mapper)
        {
            _tripRepository = tripRepository;
            _mapper = mapper;
        }
        public async Task<ActionResult<List<TripDto>>> GetAllTrips()
        {
            List<Trip> result = await _tripRepository.GetAllTrips();

            if(result == null)
            {
                return new NoContentResult();
            }

            return new OkObjectResult(_mapper.Map<List<TripDto>>(result));
        }
        public async Task<ActionResult<List<TripDto>>> GetBestTripMatches(SearchTripModel searchTrip)
        {
            List<Trip> result = await _tripRepository.GetBestTripMatches(searchTrip);

            if (result == null)
            {
                return new NoContentResult();
            }

            return new OkObjectResult(_mapper.Map<List<TripDto>>(result));
        }
        public async Task<ActionResult<TripDto>> GetTripById(Guid tripId)
        {
            Trip result = await _tripRepository.GetTripById(tripId);

            if (result == null)
            {
                return new NoContentResult();
            }

            return new OkObjectResult(_mapper.Map<List<TripDto>>(result));
        }

        public async Task<ActionResult<bool>> InsertNewTrip(TripDto tripDto)
        {
            Trip trip = _mapper.Map<Trip>(tripDto);
            var result = await _tripRepository.InsertNewTrip(trip);

            if (!result)
            {
                return new StatusCodeResult(500);
            }

            return new OkObjectResult(result);
        }

        public async Task<ActionResult<bool>> CancelTripByAuthority(Guid tripId)
        {
            
            var result = await _tripRepository.CancelTripByAuthority(tripId);

            if (!result)
            {
                return new StatusCodeResult(500);
            }

            return new OkObjectResult(result);
        }


        public async Task<ActionResult<bool>> UpdateTrip(Guid tripId, TripDto tripDto)
        {
            Trip trip = _mapper.Map<Trip>(tripDto);
            var result = await _tripRepository.UpdateTrip(tripId, trip);

            if (!result)
            {
                return new StatusCodeResult(500);
            }

            return new OkObjectResult(result);
        }

        public async Task<ActionResult<bool>> DeleteTrip(Guid tripId)
        {
            var result = await _tripRepository.DeleteTrip(tripId);

            if (!result)
            {
                return new StatusCodeResult(500);
            }

            return new OkObjectResult(result);
        }
    }
}
