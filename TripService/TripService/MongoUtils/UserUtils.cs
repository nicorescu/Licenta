using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Models.Domain;
using TripService.Resources;

namespace TripService.MongoUtils
{
    public class UserUtils : IUserUtils
    {
        private readonly IMongoCollection<User> _collection;

        public UserUtils(IMongoClient mongoClient)
        {
            _collection = mongoClient.GetDatabase(StringResources.DatabaseName).GetCollection<User>(StringResources.UserCollectionName);
        }
        public async Task<List<Guid>> GetUserFriends(Guid userId)
        {
            try
            {
                var result = _collection.Find(x => x.Id.Equals(userId)).Project(x => x.Friends);
                return await result.FirstOrDefaultAsync();
            } catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<Guid>();
            }
        }

    }
}
