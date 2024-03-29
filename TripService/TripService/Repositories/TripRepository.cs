﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization;
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
        public async Task<Tuple<List<DetailedTrip>, int>> SearchTrips(SearchFilter searchFilter)
        {
            try
            {
                List<Guid> requesterFriends = new List<Guid>();
                if (searchFilter.FriendsOnly)
                {
                    requesterFriends = await _userUtils.GetUserFriends(searchFilter.RequesterId);
                    if (requesterFriends == null)
                    {
                        requesterFriends = new List<Guid>();
                    }
                }

                var query = GetSearchQuery(searchFilter, requesterFriends)
                    .Skip(searchFilter.PageSize * (searchFilter.RequestedPage - 1))
                    .Limit(searchFilter.PageSize);

                var count = GetSearchQuery(searchFilter, requesterFriends).Count();

                var tripsResult = await query.ToListAsync();
                var tripsCount = await count.FirstOrDefaultAsync();

                return Tuple.Create(tripsResult, tripsCount != null ? (int)tripsCount.Count : 0);
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
        public async Task<SelectedTripResult> GetSelectedTrip(Guid tripId)
        {
            try
            {
                var result = _collection.Aggregate()
                    .AppendStage<Trip>(AtlasSearchExtensions.GetMatchByIdStage(tripId))
                    .AppendStage<SelectedTripResult>(AtlasSearchExtensions.ProjectTripStage())
                    .AppendStage<SelectedTripResult>(AtlasSearchExtensions.LookupOrganizerStage())
                    .AppendStage<SelectedTripResult>(AtlasSearchExtensions.LookupParticipantsStage())
                    .AppendStage<SelectedTripResult>(AtlasSearchExtensions.ProjectWithoutPasswords())
                    .AppendStage<SelectedTripResult>(AtlasSearchExtensions.ProjectFullTripStage());

                return await result.FirstOrDefaultAsync(); ;
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.ToString());
                return null;
            }
        }

        public async Task<int> InsertNewTrip(Trip trip)
        {
            try
            {
                /* var existingTrip = _collection.FindAsync(x => x.OrganizerId.Equals(trip.OrganizerId) &&
                 ((DateTime.Compare(trip.StartDate, x.StartDate) == 0 || DateTime.Compare(trip.StartDate, x.StartDate) == 1));*/
                var res = _collection.Find(x => x.OrganizerId.Equals(trip.OrganizerId) &&
                (x.State.Equals(TripState.Planning) || x.State.Equals(TripState.InProgress)) &&
                (
                 (trip.StartDate >= x.StartDate && trip.StartDate <= x.EndDate) ||
                 (trip.EndDate >= x.StartDate && trip.EndDate <= x.EndDate) ||
                 (x.StartDate >= trip.StartDate && x.EndDate <= trip.EndDate)
                ));

                var existingTrip = await res.FirstOrDefaultAsync();

                if(existingTrip != null)
                {
                    return 409;
                }

                await _collection.InsertOneAsync(trip);
                return 200;
            }
            
            catch (Exception excetion)
            {
                Console.WriteLine(excetion.ToString());
                return 500;
            }
        }

        public async Task<bool> AddParticipant(Guid tripId, Guid participantId)
        {
            try
            {
                var filter = Builders<Trip>.Filter.Eq(x => x.Id, tripId);
                var update = Builders<Trip>.Update.Push(x => x.ParticipantsIds, participantId);
                var result = await _collection.UpdateOneAsync(filter, update);
                return result.IsAcknowledged && result.ModifiedCount > 0 ? true : false;
            }
            catch (Exception exception)
            {
                Console.Write(exception.Message);
                return false;
            }
        }
        public async Task<bool> AddParticipationRequest(Guid tripId, Guid userId)
        {
            try
            {
                var filter = Builders<Trip>.Filter.Eq(x => x.Id, tripId);
                var update = Builders<Trip>.Update.Push(x => x.Requests, userId);
                var result = await _collection.UpdateOneAsync(filter, update);
                return result.IsAcknowledged || result.ModifiedCount > 0 ? true : false;
            }
            catch (Exception exception)
            {
                Console.Write(exception.Message);
                return false;
            }

        }

        public async Task<bool> RemoveParticipationRequest(Guid tripId, Guid userId)
        {
            try
            {
                var filter = Builders<Trip>.Filter.Eq(x => x.Id, tripId);


                var update = Builders<Trip>.Update.Pull(x => x.Requests, userId);
                var result = await _collection.UpdateOneAsync(filter, update);
                return result.IsAcknowledged || result.ModifiedCount > 0 ? true : false;
            }
            catch (Exception exception)
            {
                Console.Write(exception.Message);
                return false;
            }
        }

        public async Task<bool> RemoveParticipant(Guid tripId, Guid userId)
        {
            try
            {
                var filter = Builders<Trip>.Filter.Eq(x => x.Id, tripId);


                var update = Builders<Trip>.Update.Pull(x => x.ParticipantsIds, userId);
                var result = await _collection.UpdateOneAsync(filter, update);
                return result.IsAcknowledged || result.ModifiedCount > 0 ? true : false;
            }
            catch (Exception exception)
            {
                Console.Write(exception.Message);
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

        public async Task<bool> CancelTrip(Guid tripId)
        {
            try
            {
                var tripFilter = Builders<Trip>.Filter.Eq(trip => trip.Id, tripId);
                var tripUpdate = Builders<Trip>.Update.Set(trip => trip.State, TripState.Canceled);

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

        public async Task<Tuple<List<Trip>, int>> GetUsersOrganizedTrips(Guid userId, int pageNumber)
        {
            try
            {
                var tripsCount = await _collection.CountDocumentsAsync(trip => trip.OrganizerId.Equals(userId));

                var result = _collection.Find(trip => trip.OrganizerId.Equals(userId))
                    .Skip(6*(pageNumber-1))
                    .Limit(6)
                    .SortBy(x=> x.State);

                var trips = await result.ToListAsync();
                return Tuple.Create(trips, (int)tripsCount);
            }
            catch (Exception excetion)
            {
                Console.WriteLine(excetion.ToString());
                return null;
            }
        }
        public async Task<Tuple<List<Trip>,int>> GetUsersParticipatedTrips(Guid userId, int pageNumber)
        {
            try
            {
                var tripsCount = await _collection.CountDocumentsAsync(trip => trip.ParticipantsIds.Contains(userId));

                var result = _collection.Find(trip => trip.ParticipantsIds.Contains(userId))
                    .Skip(6 * (pageNumber - 1))
                    .Limit(6)
                    .SortBy(x => x.State);

                var trips = await result.ToListAsync();
                return Tuple.Create(trips, (int)tripsCount);  
            }
            catch (Exception excetion)
            {
                Console.WriteLine(excetion.ToString());
                return null;
            }
        }

        private IAggregateFluent<DetailedTrip> GetSearchQuery(SearchFilter searchFilter, List<Guid> requesterFriends)
        {
            string[] keywords = searchFilter.Keywords.Split(',').Select(x => x.Trim()).Where(x => !string.IsNullOrEmpty(x)).ToArray();
            var query = _collection.Aggregate()
                .AppendStage<Trip>(AtlasSearchExtensions.GetMatchingLocationsQuery(keywords,searchFilter.Country))
                .AppendStage<Trip>(AtlasSearchExtensions.GetPrivacyRestriction())
                .AppendStage<Trip>(AtlasSearchExtensions.GetOwnTripsRestriction(searchFilter.RequesterId))
                .AppendStage<Trip>(AtlasSearchExtensions.GetDatesRestrictionQuery(searchFilter.StartDate, searchFilter.EndDate))
                .AppendStage<BsonDocument>(AtlasSearchExtensions.ProjectParticipantsLength())
                .AppendStage<Trip>(AtlasSearchExtensions.GetSlotsNumberStage())
                .AppendStage<DetailedTrip>(AtlasSearchExtensions.LookupOrganizerStage())
                .AppendStage<DetailedTrip>(AtlasSearchExtensions.ProjectFullTripStage())
                .AppendStage<DetailedTrip>(AtlasSearchExtensions.ProjectWithoutPasswords());
            if (searchFilter.FriendsOnly)
            {
                query = query.AppendStage<DetailedTrip>(AtlasSearchExtensions.GetFriendsOnlyRestriction(requesterFriends));
            }
            return query;
        }

        public async Task<bool> UpdateTripsState()
        {
            try
            {
                var today = DateTime.Today;

                var startDateFilter = Builders<Trip>.Filter.And(
                    Builders<Trip>.Filter.Lte(t => t.StartDate,today),
                    Builders<Trip>.Filter.Eq(t=>t.State, TripState.Planning));
                var startDateUpdate = Builders<Trip>.Update.Set(t => t.State, TripState.InProgress);

                var firstRes = await _collection.UpdateManyAsync(startDateFilter, startDateUpdate);

                var endDateFilter = Builders<Trip>.Filter.And(
                    Builders<Trip>.Filter.Lte(t => t.EndDate, today),
                    Builders<Trip>.Filter.Eq(t => t.State, TripState.InProgress));

                var endDateUpdate = Builders<Trip>.Update.Set(t => t.State, TripState.Finished);


                var secondRes = await _collection.UpdateManyAsync(endDateFilter, endDateUpdate);

                return true;
            }
            catch (Exception excetion)
            {
                Console.WriteLine(excetion.ToString());
                return false;
            }
        }

        public async Task<List<User>> GetParticipationRequests(Guid tripId)
        {
            try
            {
                var result = _collection.Aggregate()
                    .AppendStage<BsonDocument>(AtlasSearchExtensions.GetMatchByIdStage(tripId))
                    .AppendStage<BsonDocument>(AtlasSearchExtensions.GetLookupParticipationRequests())
                    .AppendStage<BsonDocument>(AtlasSearchExtensions.ProjectParticipationRequests())
                    .AppendStage<BsonDocument>(AtlasSearchExtensions.UnwindParticipationRequests())
                    .AppendStage<User>(AtlasSearchExtensions.ReplaceRequestsRoot());

                return await result.ToListAsync();
            }
            catch (Exception excetion)
            {
                Console.WriteLine(excetion.ToString());
                return null;
            }
        }
    }
}