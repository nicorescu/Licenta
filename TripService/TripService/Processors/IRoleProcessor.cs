using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Models.Dtos;

namespace TripService.Processors
{
    public interface IRoleProcessor
    {
        Task<List<RoleDto>> GetAllRoles();
        Task<bool> InsertNewRole(RoleDto role);
        Task<bool> DeleteRole(Guid roleId);
    }
}
