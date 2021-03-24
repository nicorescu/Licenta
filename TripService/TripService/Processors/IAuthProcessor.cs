using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Models.ApiModels;
using TripService.Models.Dtos;

namespace TripService.Processors
{
    public interface IAuthProcessor
    {
        Task<ActionResult<string>> Login(CredentialsModel credentials);
        Task<ActionResult<string>> Signup(UserDto userDto);
    }
}
