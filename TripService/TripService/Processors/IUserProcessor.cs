﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Models.ApiModels;
using TripService.Models.Dtos;

namespace TripService.Processors
{
    public interface IUserProcessor
    {
        Task<ActionResult<List<UserDto>>> GetAllUsers();

        Task<ActionResult<UserDto>> GetUserById(Guid userId);
        Task<ActionResult<bool>> InsertNewUser(UserDto user);
        Task<ActionResult<bool>> UpdateUser(Guid id, UserDto user);
        Task<ActionResult<bool>> DeleteUser(Guid userId);
        Task<ActionResult<List<UserDto>>> GetUsersByIds(List<Guid> ids);
        Task<ActionResult<bool>> AddFriendRequest(Guid userId, Guid requesterId);
        Task<ActionResult<List<UserDto>>> GetFriendRequests(Guid userId);
        Task<ActionResult<bool>> ApproveFriendRequest(FriendRequestApproval friendRequestApproval);
        Task<ActionResult<bool>> RemoveFriendRequest(Guid requestedUserId, Guid requesterUserId);
        Task<ActionResult<bool>> RemoveFriend(Guid userId, Guid friendToRemoveId);
        Task<ActionResult<List<UserDto>>> SearchFriends(Guid userId, string keyword);
        Task<ActionResult<bool>> AddProfilePicture(Guid userId, IFormFile image);
        Task<ActionResult<bool>> RemoveProfilePicture(Guid userId);
        Task<ActionResult<List<UserDto>>> GetUserFriends(Guid userId);
        Task<ActionResult<bool>> ChangePassword(Guid userId, PasswordChange passwordChange);
        Task<ActionResult<bool>> ChangeProfilePrivacy(Guid userId, bool publicProfile);
       /* Task<ActionResult<bool>> AddNewConversation(Guid userId, ConversationDto conversation);*/
        Task<ActionResult<bool>> AddNotification(Guid userId, NotificationDto notification);
        Task<ActionResult<List<UserDto>>> SearchUser(string keyword);
    }
}
