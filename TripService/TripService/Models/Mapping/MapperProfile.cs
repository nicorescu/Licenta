using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Models.Domain;
using TripService.Models.Dtos;

namespace TripService.Models.Mapping
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<User, UserDto>()
                .ForMember(dto => dto.Id, opt => opt.MapFrom(domain => domain.Id.ToString()));

            CreateMap<Trip, TripDto>()
                .ForMember(dto => dto.Id, opt => opt.MapFrom(domain => domain.Id.ToString()));

            CreateMap<Role, RoleDto>();

            CreateMap<UserDto, User>();

            CreateMap<TripDto, Trip>();

            CreateMap<RoleDto, Role>();
        }
    }
}
