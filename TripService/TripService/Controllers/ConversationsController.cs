using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TripService.Models.Dtos;
using TripService.Processors;

namespace TripService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConversationsController : ControllerBase
    {
        private IConversationProcessor _conversationProcessor;
        public ConversationsController(IConversationProcessor conversationProcessor)
        {
            _conversationProcessor = conversationProcessor;
        }

        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        [Authorize]
        [HttpGet("/conversations/{userId}")]
        public async Task<ActionResult<List<FullConversationDto>>> GetUsersConversations([FromRoute] Guid userId)
        {
            return await _conversationProcessor.GetUsersConversations(userId);
        }

        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        [Authorize]
        [HttpGet("/conversations")]
        public async Task<ActionResult<ConversationDto>> GetSpecificConversation([FromQuery] Guid firstUserId, [FromQuery] Guid secondUserId)
        {
            return await _conversationProcessor.GetSpecificConversation(firstUserId, secondUserId);
        }

        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        [Authorize]
        [HttpPost("/conversations")]
        public async Task<ActionResult<bool>> AddNewConversation([FromBody] ConversationDto conversation)
        {
            return await _conversationProcessor.AddConversation(conversation);
        }

        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        [Authorize]
        [HttpPost("/conversations/messages")]
        public async Task<ActionResult<bool>> AddMessageToConversation([FromBody] MessageDto message, [FromQuery] Guid firstUserId, [FromQuery] Guid secondUserId)
        {
            return await _conversationProcessor.AddMessageToConversation(message,firstUserId, secondUserId);
        }

        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        [Authorize]
        [HttpDelete("/conversations")]
        public async Task<ActionResult<bool>> DeleteConversation([FromQuery] Guid firstUserId, [FromQuery] Guid secondUserId)
        {
            return await _conversationProcessor.DeleteConversation(firstUserId, secondUserId);
        }
    }
}
