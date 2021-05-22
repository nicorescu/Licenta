using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Models.ApiModels;
using TripService.Models.Domain;
using TripService.Models.Dtos;
using TripService.Repositories;

namespace TripService.Processors
{
    public class UserProcessor : IUserProcessor
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UserProcessor(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }
        public async Task<ActionResult<List<UserDto>>> GetAllUsers()
        {
            List<User> result = await _userRepository.GetAllUsers();

            if (result == null)
            {
                return new NoContentResult();
            }

            return new OkObjectResult(_mapper.Map<List<UserDto>>(result));
        }

        public async Task<ActionResult<UserDto>> GetUserById(Guid userId)
        {
            User result = await _userRepository.GetUserById(userId);

            if (result == null)
            {
                return new NoContentResult();
            }

            return new OkObjectResult(_mapper.Map<UserDto>(result));
        }
        public async Task<ActionResult<bool>> InsertNewUser(UserDto userDto)
        {
            User user = _mapper.Map<User>(userDto);
            var result = await _userRepository.InsertNewUser(user);

            if (!result)
            {
                return new StatusCodeResult(500);
            }

            return new OkObjectResult(result);
        }
        public async Task<ActionResult<bool>> UpdateUser(Guid id, UserDto userDto)
        {
            User user = _mapper.Map<User>(userDto);
            var result = await _userRepository.UpdateUser(id, user);

            if (!result)
            {
                return new StatusCodeResult(500);
            }

            return new OkObjectResult(result);
        }

        public async Task<ActionResult<bool>> DeleteUser(Guid userId)
        {

            var result = await _userRepository.DeleteUser(userId);

            if (!result)
            {
                return new StatusCodeResult(500);
            }

            return new OkObjectResult(result);
        }

        public async Task<ActionResult<List<UserDto>>> GetUsersByIds(List<Guid> ids)
        {
            var result = await _userRepository.GetUsersByIds(ids);
            if (result == null)
            {
                return new NoContentResult();
            }
            return new OkObjectResult(_mapper.Map<List<UserDto>>(result));
        }

        public async Task<ActionResult<bool>> AddApprovalRequest(Guid userId, ApprovalRequestDto approvalRequestDto)
        {
            var result = await _userRepository.AddApprovalRequest(userId,_mapper.Map<ApprovalRequest>(approvalRequestDto));
            if (!result)
            {
                return new StatusCodeResult(500);
            }

            return new OkObjectResult(result);
        }
        public async Task<ActionResult<bool>> AddFriendRequest(Guid userId, FriendRequestDto friendRequestDto)
        {
            var result = await _userRepository.AddFriendRequest(userId, _mapper.Map<FriendRequest>(friendRequestDto));
            if (!result)
            {
                return new StatusCodeResult(500);
            }

            return new OkObjectResult(result);
        }

        public async Task<ActionResult<List<UserDto>>> GetFriendRequests(Guid userId)
        {
            var result = await _userRepository.GetFriendRequests(userId);
            if (result == null)
            {
                return new NoContentResult();
            }

            return new OkObjectResult(_mapper.Map<List<UserDto>>(result));
        }

        public async Task<ActionResult<bool>> ApproveFriendRequest(FriendRequestApproval friendRequestApproval)
        {
            var result = await _userRepository.ApproveFriendRequest(friendRequestApproval);
            if (!result)
            {
                return new StatusCodeResult(500);
            }

            return new OkObjectResult(result);
        }

        public async Task<ActionResult<bool>> RemoveFriendRequest(Guid requestedUserId, Guid requesterUserId)
        {
            var result = await _userRepository.RemoveFriendRequest(requestedUserId, requesterUserId);
            if (!result)
            {
                return new StatusCodeResult(500);
            }

            return new OkObjectResult(result);
        }
       
    }
}
