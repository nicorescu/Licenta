﻿using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Enumerators;
using TripService.Extensions;
using TripService.Models.ApiModels;
using TripService.Models.Domain;
using TripService.MongoUtils;
using TripService.Resources;

namespace TripService.Repositories
{
    public class TripRepository : ITripRepository
    {
        private readonly IMongoCollection<Trip> _collection;
        private readonly IUserUtils _userUtils;
        public TripRepository(IMongoClient mongoClient, IUserUtils userUtils)
        {

            _collection = mongoClient.GetDatabase(StringResources.DatabaseName).GetCollection<Trip>(StringResources.TripCollectionName);
            _userUtils = userUtils;
        }
        public async Task<List<Trip>> GetAllTrips()
        {
            try
            {
                var result = await _collection.FindAsync(trip => true);
                return result.ToList();
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.ToString());
                return null;
            }
        }
        public async Task<Tuple<List<Trip>, int>> SearchTrips(SearchFilter searchFilter)
        {
            try
            {
                List<Guid> requesterFriends = new List<Guid>();
                if (searchFilter.FriendsOnly)
                {
                    requesterFriends = await _userUtils.GetUserFriends(searchFilter.RequesterId);
                }

                var query = GetSearchQuery(searchFilter, requesterFriends)
                    .Limit(searchFilter.PageSize)
                    .Skip(searchFilter.PageSize * (searchFilter.RequestedPage-1));
                var count = query.Count();

                var tripsResult = await query.ToListAsync();
                var tripsCount = await count.FirstOrDefaultAsync();

                return Tuple.Create(tripsResult, (int)tripsCount.Count);
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.ToString());
                return null;
            }
        }
        public async Task<Trip> GetTripById(Guid tripId)
        {
            try
            {
                var result = await _collection.FindAsync(trip => trip.Id == tripId);
                return result.FirstOrDefault(); ;
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.ToString());
                return null;
            }
        }

        public async Task<bool> InsertNewTrip(Trip trip)
        {
            try
            {
                var x = trip;
                await _collection.InsertOneAsync(trip);
                return true;
            }
            catch (Exception excetion)
            {
                Console.WriteLine(excetion.ToString());
                return false;
            }
        }

        public async Task<bool> CancelTripByAuthority(Guid tripId)
        {
            try
            {
                var tripFilter = Builders<Trip>.Filter.Eq(trip => trip.Id, tripId);
                var tripUpdate = Builders<Trip>.Update.Set(trip => trip.State, TripState.CanceledByAuthority);

                var result = await _collection.UpdateOneAsync(tripFilter, tripUpdate);
                return (result.IsAcknowledged || result.ModifiedCount > 0) ? true : false;
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.ToString());
                return false;
            }
        }

        public async Task<bool> UpdateTrip(Guid tripId, Trip trip)
        {
            try
            {
                trip.Id = tripId;
                ReplaceOneResult result = await _collection.ReplaceOneAsync(trip => trip.Id == tripId, trip);
                return (result.IsAcknowledged || result.ModifiedCount > 0) ? true : false;
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.ToString());
                return false;
            }
        }

        public async Task<bool> DeleteTrip(Guid tripId)
        {
            try
            {
                DeleteResult result = await _collection.DeleteOneAsync(trip => trip.Id == tripId);

                return (result.IsAcknowledged || result.DeletedCount > 0) ? true : false;
            }
            catch (Exception excetion)
            {
                Console.WriteLine(excetion.ToString());
                return false;
            }
        }

        private IAggregateFluent<Trip> GetSearchQuery(SearchFilter searchFilter, List<Guid> requesterFriends)
        {
            string[] keywords = searchFilter.Keywords.Split(',').Select(x => x.Trim()).ToArray();
            var query = _collection.Aggregate()
                .AppendStage<Trip>(AtlasSearchExtensions.GetMatchingLocationsQuery(searchFilter.WholeCountry ? keywords : keywords.SkipLast(1).ToArray()))
                .AppendStage<Trip>(AtlasSearchExtensions.GetPrivacyRestriction())
                .AppendStage<Trip>(AtlasSearchExtensions.GetDatesRestrictionQuery(searchFilter.StartDate, searchFilter.EndDate))
                .AppendStage<Trip>(searchFilter.FriendsOnly ? AtlasSearchExtensions.GetFriendsOnlyRestriction(requesterFriends) : AtlasSearchExtensions.GetEmptyStage());
            return query;
        }

    }
}