using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Models.Domain;
using TripService.Models.Dtos;
using TripService.Repositories;

namespace TripService.Processors
{
    public class ConversationProcessor : IConversationProcessor
    {
        private readonly IConversationRepository _conversationRepository;
        private readonly IMapper _mapper;
        public ConversationProcessor(IConversationRepository conversationRepository, IMapper mapper)
        {
            _conversationRepository = conversationRepository;
            _mapper = mapper;
        }
        public async Task<ActionResult<List<FullConversationDto>>> GetUsersConversations(Guid userId)
        {
            try
            {
                var result = await _conversationRepository.GetUsersConversations(userId);
                if (result == null)
                {
                    return new NoContentResult();
                }

                return _mapper.Map<List<FullConversationDto>>(result);
            } catch (Exception exception)
            {
                Console.WriteLine(exception.Message);
                return null;
            }
        }
        public async Task<ActionResult<ConversationDto>> GetSpecificConversation(Guid firstUserId, Guid secondUserId)
        {
            var result = await _conversationRepository.GetSpecificConversation(firstUserId, secondUserId);

            if(result == null)
            {
                return new NoContentResult();
            }

            return new OkObjectResult(_mapper.Map<ConversationDto>(result));
        }
        public async Task<ActionResult<bool>> AddConversation(ConversationDto conversation)
        {
            var result = await _conversationRepository.AddConversation(_mapper.Map<Conversation>(conversation));

            if (!result)
            {
                return new StatusCodeResult(500);
            }

            return new OkObjectResult(result);
        }
        public async Task<ActionResult<bool>> DeleteConversation(Guid firstUserId, Guid secondUserId)
        {
            var result = await _conversationRepository.DeleteConversation(firstUserId, secondUserId);

            if (!result)
            {
                return new StatusCodeResult(500);
            }

            return new OkObjectResult(result);
        }
        public async Task<ActionResult<bool>> AddMessageToConversation(UserMessageDto message, Guid conversationId)
        {
            var result = await _conversationRepository.AddMessageToConversation(_mapper.Map<UserMessage>(message), conversationId);

            if (!result)
            {
                return new StatusCodeResult(500);
            }

            return new OkObjectResult(result);
        }

        public async Task<ActionResult<bool>> UpdateConversationSeenStatus(Guid conversationId, Guid userId)
        {
            var result = await _conversationRepository.UpdateConversationSeenStatus(conversationId, userId);

            if (!result)
            {
                return new StatusCodeResult(500);
            }

            return new OkObjectResult(result);
        }

        public async Task<ActionResult<List<UserMessageDto>>> GetMessages(Guid conversationId, int limit)
        {
            var result = await _conversationRepository.GetMessages(conversationId, limit);

            if (result == null)
            {
                return new NoContentResult();
            }

            return new OkObjectResult(result);
        }
    }
}
