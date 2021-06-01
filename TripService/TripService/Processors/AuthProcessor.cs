using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Models.ApiModels;
using TripService.Models.Domain;
using TripService.Models.Dtos;
using TripService.Repositories;

namespace TripService.Processors
{
    public class AuthProcessor : IAuthProcessor
    {
        private readonly IAuthRepository _authRepository;
        private readonly IMapper _mapper;
        public AuthProcessor(IAuthRepository authRepository, IMapper mapper)
        {
            _authRepository = authRepository;
            _mapper = mapper;
        }
        public async Task<ActionResult<string>> Login(CredentialsModel credentials)
        {
            credentials.Email = credentials.Email.ToLower();
            var result = await _authRepository.Login(credentials);
            
            if(result == "wrongCredentials")
            {
                return new UnauthorizedObjectResult(result);
            }

            if(result == null)
            {
                return new StatusCodeResult(500);
            }

            return new OkObjectResult(result);
        }
        public async Task<ActionResult<string>> Signup(UserDto userDto)
        {
            User user = _mapper.Map<User>(userDto);
            var result = await _authRepository.Signup(user);

            if(result == null)
            {
                return new StatusCodeResult(500);
            }

            if(result == "existing")
            {
                return new StatusCodeResult(409);
            }

            return new OkObjectResult(result);
        }
    }
}
