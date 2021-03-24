using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Models.ApiModels;
using TripService.Models.Domain;

namespace TripService.Repositories
{
    public interface IAuthRepository
    {
        Task<string> Login(CredentialsModel credentials);
        Task<string> Signup(User user);
    }
}
