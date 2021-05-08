using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.MongoUtils
{
    public interface IUserUtils
    {
       Task<List<Guid>> GetUserFriends(Guid userId);
    }
}
