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
            CreateMap<UserDto, User>();

            CreateMap<Trip, TripDto>()
                .ForMember(dto => dto.Id, opt => opt.MapFrom(domain => domain.Id.ToString()))
                .ForMember(dto => dto.ReviewAverage, opt => opt.MapFrom(domain => domain.Reviews.Average(review => review.Stars)));
            CreateMap<TripDto, Trip>();

            CreateMap<Role, RoleDto>();
            CreateMap<RoleDto, Role>();

            CreateMap<Review, ReviewDto>();
            CreateMap<ReviewDto, Review>();
        }
    }
}
