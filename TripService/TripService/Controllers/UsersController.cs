using Microsoft.AspNetCore.Authorization;
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
        [HttpPost("/users/approval-requests/{id}")]
        public async Task<ActionResult<bool>> AddApprovalRequest([FromRoute] Guid id,[FromBody] ApprovalRequestDto approvalRequestDto)
        {
            return await _userProcessor.AddApprovalRequest(id, approvalRequestDto);
        }

        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        [Authorize]
        [HttpPost("/users/friend-requests/{id}")]
        public async Task<ActionResult<bool>> AddFriendRequest([FromRoute] Guid id, [FromBody] FriendRequestDto friendRequestDto)
        {
            return await _userProcessor.AddFriendRequest(id, friendRequestDto);
        }
    }
}
