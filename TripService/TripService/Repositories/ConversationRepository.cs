using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Extensions;
using TripService.Models.Domain;
using TripService.Resources;

namespace TripService.Repositories
{
    public class ConversationRepository : IConversationRepository
    {
        private readonly IMongoCollection<Conversation> _collection;
        public ConversationRepository(IMongoClient mongoClient)
        {

            _collection = mongoClient.GetDatabase(StringResources.DatabaseName).GetCollection<Conversation>(StringResources.ConversationCollectionName);
        }

        public async Task<List<FullConversation>> GetUsersConversations(Guid userId)
        {
            try
            {
                var result = _collection.Aggregate()
                    .AppendStage<BsonDocument>(AtlasSearchExtensions.MatchUserIdInConversation(userId))
                    .AppendStage<BsonDocument>(AtlasSearchExtensions.LookupFirstUser())
                    .AppendStage<BsonDocument>(AtlasSearchExtensions.LookupSecondUser())
                    .AppendStage<BsonDocument>(AtlasSearchExtensions.SortConversations())
                    .AppendStage<FullConversation>(AtlasSearchExtensions.ProjectConversation());
                var x = await result.ToListAsync();
                return await result.ToListAsync();

            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.Message);
                return null;
            }
        }

        public async Task<Conversation> GetSpecificConversation(Guid firstUserId, Guid secondUserId)
        {
            try
            {
                var filter = Builders<Conversation>.Filter.Or(
                    Builders<Conversation>.Filter.And(
                        Builders<Conversation>.Filter.Eq(x => x.FirstUserId, firstUserId),
                        Builders<Conversation>.Filter.Eq(x => x.SecondUserId, secondUserId)
                        ),
                    Builders<Conversation>.Filter.And(
                        Builders<Conversation>.Filter.Eq(x => x.FirstUserId, secondUserId),
                        Builders<Conversation>.Filter.Eq(x => x.SecondUserId, firstUserId)
                        )
                    );
                var result = _collection.Find(filter);
                return await result.FirstOrDefaultAsync();

            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.Message);
                return null;
            }
        }

        public async Task<bool> AddConversation(Conversation conversation)
        {
            try
            {
                conversation.Id = Guid.NewGuid();
                await _collection.InsertOneAsync(conversation);
                return true;
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.Message);
                return false;
            }
        }
        public async Task<bool> DeleteConversation(Guid firstUserId, Guid secondUserId)
        {
            try
            {
                await _collection.DeleteOneAsync(x =>
                (x.FirstUserId.Equals(firstUserId) && x.SecondUserId.Equals(secondUserId)) ||
                (x.FirstUserId.Equals(secondUserId) && x.SecondUserId.Equals(firstUserId))
                );
                return true;
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.Message);
                return false;
            }
        }
        public async Task<bool> AddMessageToConversation(UserMessage message, Guid conversationId)
        {
            try
            {
                var filter = Builders<Conversation>.Filter.Eq(x => x.Id, conversationId);
                message.Id = Guid.NewGuid();
                var firstUpdate = Builders<Conversation>.Update.Push(x => x.Messages, message);
                var secondUpdate = Builders<Conversation>.Update.Set(x => x.SeenBy, new List<Guid> { message.UserId});

                var requests = new List<UpdateOneModel<Conversation>> {
                    new UpdateOneModel<Conversation>(filter, firstUpdate),
                    new UpdateOneModel<Conversation>(filter, secondUpdate)
                };
                var result = await _collection.BulkWriteAsync(requests);

                return (result.IsAcknowledged || result.ModifiedCount > 0);
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.Message);
                return false;
            }
        }

        public async Task<bool> UpdateConversationSeenStatus(Guid conversationId, Guid userId)
        {
            try
            {
                var filter = Builders<Conversation>.Filter.Eq(x => x.Id, conversationId);
                var update = Builders<Conversation>.Update.Push(x => x.SeenBy, userId);
                var result = await _collection.UpdateOneAsync(filter, update);
                return (result.IsAcknowledged || result.ModifiedCount > 0);
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.Message);
                return false;
            }
        }

        public async Task<List<UserMessage>> GetMessages(Guid conversationId, int limit)
        {
            try
            {
                var filter = Builders<Conversation>.Filter.Eq(x => x.Id, conversationId);

                var result = _collection.Aggregate()
                    .AppendStage<BsonDocument>(AtlasSearchExtensions.GetMatchByIdStage(conversationId))
                    .AppendStage<BsonDocument>(AtlasSearchExtensions.ProjectMessages())
                    .AppendStage<BsonDocument>(AtlasSearchExtensions.UnwindMessages())
                    .AppendStage<UserMessage>(AtlasSearchExtensions.ReplaceRootMessages())
                    .SortByDescending(x => x.SentAt)
                    .Limit(limit);

                return await result.ToListAsync();
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.Message);
                return null;
            }
        }
    }
}
