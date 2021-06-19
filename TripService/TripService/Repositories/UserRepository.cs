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
                var result = _collection.Find(user => user.Id == userId);
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
        public async Task<bool> AddFriendRequest(Guid userId, Guid requesterId)
        {
            try
            {
                var check = await _collection.FindAsync(x => x.Id.Equals(userId) && x.Friends.Contains(requesterId));

                if(check.FirstOrDefault() ==null)
                {
                    var filter = Builders<User>.Filter.Eq(x => x.Id, userId);

                    var update = Builders<User>.Update.Push(x => x.FriendRequests, requesterId);
                    var result = await _collection.UpdateOneAsync(filter, update);

                    return result.IsAcknowledged && result.ModifiedCount > 0 ? true : false;
                }

                return false;
                
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


                var update = Builders<User>.Update.PullAll(x => x.FriendRequests, new Guid[] { requesterUserId });
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
                var firstFilter = Builders<User>.Filter.Eq(x => x.Id, userId);
                var secondFilter = Builders<User>.Filter.Eq(x => x.Id, friendToRemoveId);

                var firstUpdate = Builders<User>.Update.PullAll(x => x.Friends, new Guid[] { friendToRemoveId });
                var secondUpdate = Builders<User>.Update.PullAll(x => x.Friends, new Guid[] { userId });

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

        public async Task<List<User>> SearchFriends(Guid userId, string keyword)
        {
            try
            {
                var query = _collection.Aggregate()
                    .AppendStage<User>(AtlasSearchExtensions.GetMatchingFriendsQuery(keyword))
                    .AppendStage<User>(AtlasSearchExtensions.GetMatchToBeFriends(userId));
                var result = await query.ToListAsync();
                return result;
            }
            catch (Exception exception)
            {
                Console.Write(exception.Message);
                return null;
            }
        }

        public async Task<bool> AddProfilePicture(Guid userId, string imagePath)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq(x => x.Id, userId);
                var update = Builders<User>.Update.Set(x => x.ProfilePicturePath, imagePath);

                var result = await _collection.UpdateOneAsync(filter, update);

                return result.IsAcknowledged || result.ModifiedCount > 0 ? true : false;
            }
            catch (Exception exception)
            {
                Console.Write(exception.Message);
                return false;
            }
        }

        public async Task<bool> RemoveProfilePicture(Guid userId)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq(x => x.Id, userId);
                var update = Builders<User>.Update.Set(x => x.ProfilePicturePath, null);

                var result = await _collection.UpdateOneAsync(filter, update);

                return result.IsAcknowledged || result.ModifiedCount > 0 ? true : false;
            }
            catch (Exception exception)
            {
                Console.Write(exception.Message);
                return false;
            }
        }

        public async Task<List<User>> GetUserFriends(Guid userId)
        {
            try
            {
                var query = _collection.Aggregate()
                    .AppendStage<User>(AtlasSearchExtensions.GetMatchByIdStage(userId))
                    .AppendStage<BsonDocument>(AtlasSearchExtensions.LookupUserFriends())
                    .AppendStage<BsonDocument>(AtlasSearchExtensions.UnwindFriends())
                    .AppendStage<User>(AtlasSearchExtensions.ReplaceRootFriends())
                    .AppendStage<User>(AtlasSearchExtensions.ProjectFriendsNoPassword());

                var result = await query.ToListAsync();
                return result;
            }
            catch (Exception exception)
            {
                Console.Write(exception.Message);
                return null;
            }
        }

        public async Task<string> ChangePassword(Guid userId, PasswordChange passwordChange)
        {
            try
            {
                var currentUser = await _collection.Find(u => u.Id.Equals(userId) && u.Password.Equals(passwordChange.OldPassword)).FirstOrDefaultAsync();

                if (currentUser == null)
                {
                    return StringResources.WrongPassword;
                }

                var update = Builders<User>.Update.Set(x => x.Password, passwordChange.NewPassword);

                var result = await _collection.UpdateOneAsync(x => x.Id.Equals(userId), update);

                return result.IsAcknowledged || result.ModifiedCount > 0 ? StringResources.PasswordUpdated : null;
            }
            catch (Exception exception)
            {
                Console.Write(exception.Message);
                return null;
            }
        }

        public async Task<bool> ChangeProfilePrivacy(Guid userId, bool publicProfile)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq(x => x.Id, userId);
                var update = Builders<User>.Update.Set(x => x.PublicProfile, publicProfile);

                var result = await _collection.UpdateOneAsync(filter, update);

              

                return result.IsAcknowledged || result.ModifiedCount > 0 ? true : false;
            }
            catch (Exception exception)
            {
                Console.Write(exception.Message);
                return false;
            }
        }

       /* public async Task<bool> AddNewConversation(Guid userId, Conversation conversation)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq(x => x.Id, userId);
                var update = Builders<User>.Update.Push(x => x.Conversations, conversation);

                var result = await _collection.UpdateOneAsync(filter, update);

                return result.IsAcknowledged || result.ModifiedCount > 0 ? true : false;
            }
            catch (Exception exception)
            {
                Console.Write(exception.Message);
                return false;
            }
        }*/

       /* public async Task<bool> AddMessageToConversation(Guid conversationId, Message message)
        {
            try
            {
                var filter = Builders<User>.Filter.ElemMatch(x => x.Conversations, c => c.Id.Equals(conversationId));
                var update = Builders<User>.Update.Push(x => x.Conversations, null);

                var result = await _collection.UpdateOneAsync(filter, update);

                return result.IsAcknowledged || result.ModifiedCount > 0 ? true : false;
            }
            catch (Exception exception)
            {
                Console.Write(exception.Message);
                return false;
            }
        }*/

        public async Task<bool> AddNotification(Guid userId, Notification notification)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq(x => x.Id, userId);
                var update = Builders<User>.Update.Push(x => x.Notifications, notification);

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
