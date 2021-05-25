using MongoDB.Bson;
using MongoDB.Bson.Serialization;
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
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _collection;

        public UserRepository(IMongoClient mongoClient)
        {
            _collection = mongoClient.GetDatabase(StringResources.DatabaseName).GetCollection<User>(StringResources.UserCollectionName);
        }
        public async Task<List<User>> GetAllUsers()
        {
            try
            {
                var result = await _collection.FindAsync(user => true);
                return result.ToList();
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.ToString());
                return null;
            }

        }

        public async Task<User> GetUserById(Guid userId)
        {
            try
            {
                var projection = Builders<User>.Projection.Exclude(x => x.Password);
                var result = _collection.Find(user => user.Id == userId).Project<User>(projection);
                return await result.FirstOrDefaultAsync(); ;
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.ToString());
                return null;
            }

        }

        public async Task<bool> InsertNewUser(User user)
        {
            try
            {
                user.Id = Guid.NewGuid();
                await _collection.InsertOneAsync(user);
                return true;
            }
            catch (Exception exception)
            {
                Console.WriteLine("Exceptieeee: " + exception.ToString());
                return false;
            }
        }

        public async Task<bool> UpdateUser(Guid userId, User user)
        {
            try
            {
                ReplaceOneResult result = await _collection.ReplaceOneAsync(user => user.Id == userId, user);
                return (result.IsAcknowledged || result.ModifiedCount > 0) ? true : false;
            }
            catch (Exception exception)
            {
                Console.WriteLine("Exceptieeee: " + exception.ToString());
                return false;
            }
        }


        public async Task<bool> DeleteUser(Guid userId)
        {
            try
            {
                DeleteResult result = await _collection.DeleteOneAsync(user => user.Id == userId);

                return (result.IsAcknowledged || result.DeletedCount > 0) ? true : false;
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.ToString());
                return false;
            }
        }

        public async Task<List<User>> GetUsersByIds(List<Guid> ids)
        {
            try
            {
                var projection = Builders<User>.Projection.Exclude(x => x.Password);

                var result = _collection.Find(user => ids.Contains(user.Id)).Project<User>(projection);

                return await result.ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<bool> AddApprovalRequest(Guid userId, ApprovalRequest approvalRequest)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq(x => x.Id, userId);
                var update = Builders<User>.Update.Push(x => x.ApprovalRequests, approvalRequest);
                var result = await _collection.UpdateOneAsync(filter, update);
                return result.IsAcknowledged || result.ModifiedCount > 0 ? true : false;
            }
            catch (Exception exception)
            {
                Console.Write(exception.Message);
                return false;
            }

        }
        public async Task<bool> AddFriendRequest(Guid userId, Guid requesterId)
        {
            try
            {

                var filter = Builders<User>.Filter.Eq(x => x.Id, userId);


                var update = Builders<User>.Update.Push(x => x.FriendRequests, requesterId);
                var result = await _collection.UpdateOneAsync(filter, update);
                return result.IsAcknowledged || result.ModifiedCount > 0 ? true : false;
            }
            catch (Exception exception)
            {
                Console.Write(exception.Message);
                return false;
            }
        }

        public async Task<List<User>> GetFriendRequests(Guid userId)
        {
            try
            {
                var projection = Builders<User>.Projection.Include("Users").Exclude("_id");
                var query = _collection.Aggregate()
                    .AppendStage<User>(AtlasSearchExtensions.GetMatchByIdStage(userId))
                    .AppendStage<User>(AtlasSearchExtensions.GetFriendRequestsLookupStage())
                    .AppendStage<FriendRequestsResult>(AtlasSearchExtensions.GetUsersProjectionStage());
                var result = await query.FirstOrDefaultAsync();
                return result.Users;
            }
            catch (Exception exception)
            {
                Console.Write(exception.Message);
                return null;
            }
        }

        public async Task<bool> ApproveFriendRequest(FriendRequestApproval friendRequestApproval)
        {
            try
            {

                var firstFilter = Builders<User>.Filter.Eq(x => x.Id, friendRequestApproval.RequestedUserId);
                var firstUpdate = Builders<User>.Update.Push(x => x.Friends, friendRequestApproval.RequesterUserId);

                var secondFilter = Builders<User>.Filter.Eq(x => x.Id, friendRequestApproval.RequesterUserId);
                var secondUpdate = Builders<User>.Update.Push(x => x.Friends, friendRequestApproval.RequestedUserId);

                var requests = new List<UpdateOneModel<User>> { 
                    new UpdateOneModel<User>(firstFilter, firstUpdate), 
                    new UpdateOneModel<User>(secondFilter, secondUpdate) 
                };
                var result = await _collection.BulkWriteAsync(requests);
                return result.IsAcknowledged || result.ModifiedCount > 0 ? true : false;
            }
            catch (Exception exception)
            {
                Console.Write(exception.Message);
                return false;
            }
        }

        public async Task<bool> RemoveFriendRequest(Guid requestedUserId, Guid requesterUserId)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq(x => x.Id, requestedUserId);


                var update = Builders<User>.Update.Pull(x => x.FriendRequests, requesterUserId);
                var result = await _collection.UpdateOneAsync(filter, update);
                return result.IsAcknowledged || result.ModifiedCount > 0 ? true : false;
            }
            catch (Exception exception)
            {
                Console.Write(exception.Message);
                return false;
            }
        }

        public async Task<bool> RemoveFriend(Guid userId, Guid friendToRemoveId)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq(x => x.Id, userId);


                var update = Builders<User>.Update.Pull(x => x.Friends, friendToRemoveId);
                var result = await _collection.UpdateOneAsync(filter, update);
                return result.IsAcknowledged || result.ModifiedCount > 0 ? true : false;
            }
            catch (Exception exception)
            {
                Console.Write(exception.Message);
                return false;
            }
        }


    }
}
