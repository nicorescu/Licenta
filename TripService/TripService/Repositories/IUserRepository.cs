using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Models.Domain;

namespace TripService.Repositories
{
    public interface IUserRepository
    {

        Task<List<User>> GetAllUsers();
        
        Task<User> GetUserById(Guid userId);
        Task<bool> InsertNewUser(User user);
        Task<bool> UpdateUser(Guid userId, User user);
        Task<bool> DeleteUser(Guid userId);
        Task<List<User>> GetUsersByIds(List<Guid> ids);
    }
}
