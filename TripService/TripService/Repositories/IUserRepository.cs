using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Models.ApiModels;
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
        Task<bool> AddFriendRequest(Guid userId, Guid requesterId);
        Task<List<User>> GetFriendRequests(Guid userId);
        Task<bool> ApproveFriendRequest(FriendRequestApproval friendRequestApproval);
        Task<bool> RemoveFriendRequest(Guid requestedUserId, Guid requesterUserId);
        Task<bool> RemoveFriend(Guid userId, Guid friendToRemoveId);
        Task<List<User>> SearchFriends(Guid userId, string keyword);
        Task<bool> AddProfilePicture(Guid userId, string imagePath);
        Task<bool> RemoveProfilePicture(Guid userId);
        Task<List<User>> GetUserFriends(Guid userId);
        Task<string> ChangePassword(Guid userId, PasswordChange passwordChange);
        Task<bool> ChangeProfilePrivacy(Guid userId, bool publicProfile);
        Task<bool> AddNotification(Guid userId, Notification notification);
        Task<List<User>> SearchUser(string keyword);
    }
}
