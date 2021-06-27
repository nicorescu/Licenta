using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Models.Dtos;

namespace TripService.Processors
{
    public interface IConversationProcessor
    {
        Task<ActionResult<List<FullConversationDto>>> GetUsersConversations(Guid userId);
        Task<ActionResult<ConversationDto>> GetSpecificConversation(Guid firstUserId, Guid secondUserId);
        Task<ActionResult<bool>> AddConversation(ConversationDto conversation);
        Task<ActionResult<bool>> AddMessageToConversation(UserMessageDto message, Guid conversationId);
        Task<ActionResult<bool>> DeleteConversation(Guid firstUserId, Guid secondUserId);
    }
}
