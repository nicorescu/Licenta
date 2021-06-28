using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TripService.Models.ApiModels;
using TripService.Models.Domain;
using TripService.Models.Dtos;
using TripService.Repositories;
using TripService.Resources;
using TripService.SignalR;

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

            if (result.Notifications?.Count > 0)
            {
                result.Notifications = result.Notifications.OrderByDescending(x => x.SentAt).ToList();
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
        public async Task<ActionResult<bool>> AddFriendRequest(Guid userId, Guid requesterId)
        {
            var result = await _userRepository.AddFriendRequest(userId, requesterId);
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

        public async Task<ActionResult<bool>> RemoveFriend(Guid userId, Guid friendToRemoveId)
        {
            var result = await _userRepository.RemoveFriend(userId, friendToRemoveId);
            if (!result)
            {
                return new StatusCodeResult(500);
            }

            return new OkObjectResult(result);
        }

        public async Task<ActionResult<List<UserDto>>> SearchFriends(Guid userId, string keyword)
        {
            var result = await _userRepository.SearchFriends(userId, keyword);
            if (result == null)
            {
                return new NoContentResult();
            }

            return new OkObjectResult(result);
        }

        public async Task<ActionResult<bool>> AddProfilePicture(Guid userId, IFormFile image)
        {
            try
            {
                var folderName = Path.Combine("Files", "ProfilePictures");
                var fileName = $"{userId}.png";

                var pathToFolder = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                var pathToSave = Path.Combine(pathToFolder, fileName);
                var dbPath = Path.Combine(folderName, fileName);

                var result = await _userRepository.AddProfilePicture(userId, dbPath);

                if (!result)
                {
                    return new StatusCodeResult(500);
                }
                FileResources.SaveFormFile(pathToSave, image);
                return new OkObjectResult(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new StatusCodeResult(500);
            }

        }

        public async Task<ActionResult<bool>> RemoveProfilePicture(Guid userId)
        {
            try
            {
                var folderName = Path.Combine("Files", "ProfilePictures");
                var fileName = $"{userId}.png";

                var pathToFolder = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                var result = await _userRepository.RemoveProfilePicture(userId);

                if (!result)
                {
                    return new StatusCodeResult(500);
                }
                FileResources.DeleteFilesByPattern(pathToFolder, userId.ToString());
                return new OkObjectResult(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new StatusCodeResult(500);
            }

        }

        public async Task<ActionResult<List<UserDto>>> GetUserFriends(Guid userId)
        {
            var result = await _userRepository.GetUserFriends(userId);
            if (result == null)
            {
                return new NoContentResult();
            }

            return new OkObjectResult(_mapper.Map<List<UserDto>>(result));
        }

        public async Task<ActionResult<bool>> ChangePassword(Guid userId, PasswordChange passwordChange)
        {
            var result = await _userRepository.ChangePassword(userId, passwordChange);
            if (result.Equals(StringResources.WrongPassword))
            {
                return new UnauthorizedObjectResult(false);
            }

            if (result == null)
            {
                return new StatusCodeResult(500);
            }

            return new OkObjectResult(true);
        }

        public async Task<ActionResult<bool>> ChangeProfilePrivacy(Guid userId, bool publicProfile)
        {
            var result = await _userRepository.ChangeProfilePrivacy(userId, publicProfile);

            if (!result)
            {
                return new StatusCodeResult(500);
            }

            return new OkObjectResult(result);
        }

        /* public async Task<ActionResult<bool>> AddNewConversation(Guid userId, ConversationDto conversation)
         {
             var result = await _userRepository.AddNewConversation(userId,_mapper.Map<Conversation>(conversation));

             if (!result)
             {
                 return new StatusCodeResult(500);
             }

             return new OkObjectResult(result);
         }*/

        public async Task<ActionResult<bool>> AddNotification(Guid userId, NotificationDto notification)
        {
            var result = await _userRepository.AddNotification(userId, _mapper.Map<Notification>(notification));

            if (!result)
            {
                return new StatusCodeResult(500);
            }

            return new OkObjectResult(result);
        }

        public async Task<ActionResult<List<UserDto>>> SearchUser(string keyword)
        {
            var result = await _userRepository.SearchUser(keyword);

            if (result == null)
            {
                return new NoContentResult();
            }

            return new OkObjectResult(result);
        }
    }
}
