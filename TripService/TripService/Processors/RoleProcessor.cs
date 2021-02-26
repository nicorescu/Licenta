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
    public class RoleProcessor : IRoleProcessor
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IMapper _mapper;
        public RoleProcessor(IRoleRepository roleRepository, IMapper mapper)
        {
            _roleRepository = roleRepository;
            _mapper = mapper;
        }
        public async Task<List<RoleDto>> GetAllRoles()
        {
            List<Role> result = await _roleRepository.GetAllRoles();

            return _mapper.Map<List<RoleDto>>(result);
        }

        public async Task<bool> InsertNewRole(RoleDto roleDto)
        {
            Role role = _mapper.Map<Role>(roleDto);
            return await _roleRepository.InsertNewRole(role);
        }
        public async Task<bool> DeleteRole(Guid roleId)
        {
            return await _roleRepository.DeleteRole(roleId);
        }

    }
}
