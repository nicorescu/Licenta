using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

    }
}
