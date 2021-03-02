using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Extensions;
using TripService.Models.ApiModels;
using TripService.Models.Domain;
using TripService.Resources;

namespace TripService.Repositories
{
    public class TripRepository : ITripRepository
    {
        private readonly IMongoCollection<Trip> _collection;
        public TripRepository(IMongoClient mongoClient)
        {
            _collection = mongoClient.GetDatabase(StringResources.DatabaseName).GetCollection<Trip>(StringResources.tripCollectionName);

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
        public async Task<List<Trip>> GetBestTripMatches(SearchTripModel searchTrip)
        {
            try
            {

                var result = await _collection.Aggregate()
                    .AppendStage<Trip>(AtlasSearchExtensions.GetMatchingLocationsQuery(searchTrip.Keywords))
                    .AppendStage<Trip>(AtlasSearchExtensions.GetDatesRestrictionQuery(searchTrip.StartDate, searchTrip.EndDate)).ToListAsync();

                return result;
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
                await _collection.InsertOneAsync(trip);
                return true;
            }
            catch (Exception excetion)
            {
                Console.WriteLine(excetion.ToString());
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
                Console.WriteLine("Exceptieeee: " + exception.ToString());
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

    }
}