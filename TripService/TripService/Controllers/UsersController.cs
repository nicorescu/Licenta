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
    public class UsersController : Controller
    {
        private IUserProcessor _userProcessor;

        public UsersController(IUserProcessor userProcessor)
        {
            _userProcessor = userProcessor;
        }

        
        [ProducesResponseType(typeof(List<UserDto>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            List<UserDto> result = await _userProcessor.GetAllUsers();

            if(result.Count == 0)
            {
                return NotFound("No user found");
            }

            return Ok(result);
        }

        
        [ProducesResponseType(typeof(List<UserDto>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [HttpPost]
        public async Task<IActionResult> InsertUser([FromBody] UserDto user)
        {
            bool result = await _userProcessor.InsertNewUser(user);

            if (!result)
            {
                return BadRequest("Couldn't insert user");
            }

            return Ok(result);
        }
    }
}
