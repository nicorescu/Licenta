using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Models.Domain;
using TripService.Models.Dtos;
using TripService.Repositories;

namespace TripService.Processors
{
    public class UserProcessor: IUserProcessor
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UserProcessor(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }
        public async Task<List<UserDto>> GetAllUsers()
        {
            List<User> result = await _userRepository.GetAllUsers();

            return _mapper.Map<List<UserDto>>(result);
        }

        public async Task<UserDto> GetUserById(Guid userId)
        {
            User result = await _userRepository.GetUserById(userId);

            return _mapper.Map<UserDto>(result);
        }
        public async Task<bool> InsertNewUser(UserDto userDto)
        {
            User user = _mapper.Map<User>(userDto);
            return await _userRepository.InsertNewUser(user);
        }
        public async Task<bool> UpdateUser(Guid id, UserDto userDto)
        {
            User user = _mapper.Map<User>(userDto);
            return await _userRepository.UpdateUser(id,user);
        }

        public async Task<bool> DeleteUser(Guid userId)
        {
            return await _userRepository.DeleteUser(userId);
        }
    }
}
