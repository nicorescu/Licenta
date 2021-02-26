using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Models.Dtos;

namespace TripService.Processors
{
    public interface IUserProcessor
    {
        Task<List<UserDto>> GetAllUsers();

        Task<UserDto> GetUserById(Guid userId);
        Task<bool> InsertNewUser(UserDto user);
        Task<bool> UpdateUser(Guid id, UserDto user);
        Task<bool> DeleteUser(Guid userId);
    }
}
