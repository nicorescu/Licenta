using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TripService.Models.ApiModels;
using TripService.Models.Dtos;
using TripService.Processors;

namespace TripService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserProcessor _userProcessor;

        public UsersController(IUserProcessor userProcessor)
        {
            _userProcessor = userProcessor;
        }


        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        [HttpGet("/users")]
        public async Task<ActionResult<List<UserDto>>> GetAllUsers()
        {
            return await _userProcessor.GetAllUsers();
        }

        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        [HttpGet("/users/{userId}")]
        public async Task<ActionResult<UserDto>> GetUserById(Guid userId)
        {
            return await _userProcessor.GetUserById(userId);
        }

        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        [HttpPost("/users")]
        public async Task<ActionResult<bool>> InsertUser([FromBody] UserDto user)
        {
            return await _userProcessor.InsertNewUser(user);
        }

        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        [HttpPut("/users/{userId}")]
        public async Task<ActionResult<bool>> UpdateUser([FromRoute] Guid userId, [FromBody] UserDto user)
        {
            return await _userProcessor.UpdateUser(userId, user);
        }

        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        [HttpDelete("/users/{userId}")]
        public async Task<ActionResult<bool>> DeleteUser(Guid userId)
        {
            return await _userProcessor.DeleteUser(userId);
        }

        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        [HttpGet("/users/by-ids")]
        public async Task<ActionResult<List<UserDto>>> GetUsersByIds([FromQuery] List<Guid> ids)
        {
            return await _userProcessor.GetUsersByIds(ids);
        }

        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        [Authorize]
        [HttpPost("/users/friend-requests/{id}")]
        public async Task<ActionResult<bool>> AddFriendRequest([FromRoute] Guid id, [FromQuery] Guid requesterUserId)
        {
            return await _userProcessor.AddFriendRequest(id, requesterUserId);
        }

        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        [Authorize]
        [HttpGet("/users/friend-requests/{userId}")]
        public async Task<ActionResult<List<UserDto>>> GetFriendRequests([FromRoute] Guid userId)
        {
            return await _userProcessor.GetFriendRequests(userId);
        }

        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        [Authorize]
        [HttpPut("/users/friend-requests/approve")]
        public async Task<ActionResult<bool>> ApproveFriendRequest([FromBody] FriendRequestApproval friendRequestApproval)
        {
            return await _userProcessor.ApproveFriendRequest(friendRequestApproval);
        }

        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        [Authorize]
        [HttpDelete("/users/friend-requests/remove/{userId}")]
        public async Task<ActionResult<bool>> RemoveFriendRequest([FromRoute] Guid userId, [FromQuery] Guid requesterUserId)
        {
            return await _userProcessor.RemoveFriendRequest(userId, requesterUserId);
        }

        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        [Authorize]
        [HttpDelete("/users/friends/remove/{userId}")]
        public async Task<ActionResult<bool>> RemoveFriend([FromRoute] Guid userId, [FromQuery] Guid friendToRemoveId)
        {
            return await _userProcessor.RemoveFriend(userId, friendToRemoveId);
        }

        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        [Authorize]
        [HttpGet("/users/search/friends/{userId:guid}")]
        public async Task<ActionResult<List<UserDto>>> SearchFriends([FromRoute] Guid userId, [FromQuery] string keyword)
        {
            return await _userProcessor.SearchFriends(userId, keyword);
        }

        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        [Authorize]
        [HttpPost("/users/profile-pictures/{userId}")]
        public async Task<ActionResult<bool>> AddProfilePicture([FromRoute] Guid userId, [FromForm] IFormFile image)
        {
            return await _userProcessor.AddProfilePicture(userId, image);
        }

        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        [Authorize]
        [HttpDelete("/users/profile-pictures/{userId}")]
        public async Task<ActionResult<bool>> RemoveProfilePicture([FromRoute] Guid userId)
        {
            return await _userProcessor.RemoveProfilePicture(userId);
        }

        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        [Authorize]
        [HttpGet("/users/friends/{userId}")]
        public async Task<ActionResult<List<UserDto>>> GetUserFriends([FromRoute] Guid userId)
        {
            return await _userProcessor.GetUserFriends(userId);
        }

        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        [Authorize]
        [HttpPut("/users/password/{userId}")]
        public async Task<ActionResult<bool>> ChangeUserPassword([FromRoute] Guid userId, [FromBody] PasswordChange passwordChange)
        {
            return await _userProcessor.ChangePassword(userId, passwordChange);
        }
    }
}
