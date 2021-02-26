using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Models.Domain;

namespace TripService.Repositories
{
    public interface IRoleRepository
    {
        Task<List<Role>> GetAllRoles();
        Task<bool> InsertNewRole(Role role);
        Task<bool> DeleteRole(Guid roleId);
    }
}
