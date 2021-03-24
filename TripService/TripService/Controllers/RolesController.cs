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
    public class RolesController : ControllerBase
    {
        private IRoleProcessor _roleProcessor;

        public RolesController(IRoleProcessor roleProcessor)
        {
            _roleProcessor = roleProcessor;
        }


        [HttpGet]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetAllRoles()
        {
            List<RoleDto> result = await _roleProcessor.GetAllRoles();

            if (result.Count == 0)
            {
                return NotFound("No roles fetched");
            }

            return Ok(result);
        }

        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> InsertRole([FromBody] RoleDto role)
        {
            bool result = await _roleProcessor.InsertNewRole(role);

            if (!result)
            {
                return BadRequest("Couldn't insert role");
            }

            return Ok(result);
        }
    }
}
