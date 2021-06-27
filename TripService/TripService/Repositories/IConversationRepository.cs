using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Models.Domain;

namespace TripService.Repositories
{
    public interface IConversationRepository
    {
        Task<List<FullConversation>> GetUsersConversations(Guid userId);
        Task<Conversation> GetSpecificConversation(Guid firstUserId, Guid secondUserId);
        Task<bool> AddConversation(Conversation conversation);
        Task<bool> DeleteConversation(Guid firstUserId, Guid secondUserId);
        Task<bool> AddMessageToConversation(UserMessage message, Guid conversationId);
    }
}
