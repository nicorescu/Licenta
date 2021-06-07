using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Models.Domain;
using TripService.Models.Dtos;
using TripService.Resources;

namespace TripService.Models.Mapping
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<User, UserDto>()
                .ForMember(dto => dto.Age, opt => opt.MapFrom(domain =>
                        domain.Birthday.Date > DateTime.Today.AddYears(-DateTime.Today.Year + domain.Birthday.Year) ?
                        DateTime.Today.Year - domain.Birthday.Year - 1 :
                        DateTime.Today.Year - domain.Birthday.Year))
                .ForMember(dto => dto.ReviewAverage, opt => opt.MapFrom(domain => domain.Reviews.Count > 0 ? Math.Round(domain.Reviews.Average(x => x.Stars), 2) : 0))
                .ForMember(dto => dto.ProfilePicUrl, opt => opt.MapFrom(domain => FileResources.ToBase64(domain.ProfilePicturePath)));

            CreateMap<UserDto, User>()
                .ForMember(domain => domain.Email, opt => opt.MapFrom(dto => dto.Email.ToLower()))
                .ForMember(domain => domain.CountryCode, opt => opt.MapFrom(dto => dto.CountryCode.ToLower()))
                .ForMember(domain => domain.ProfilePicturePath, opt => opt.MapFrom(dto => $@"Files\ProfilePictures\{dto.Id}.png"));

            CreateMap<PhoneNumber, PhoneNumberDto>();
            CreateMap<PhoneNumberDto, PhoneNumber>();

            CreateMap<Trip, TripDto>()
                .ForMember(dto => dto.Id, opt => opt.MapFrom(domain => domain.Id.ToString()))
                .ForMember(dto => dto.ReviewAverage, opt => opt.MapFrom(domain => domain.Reviews.Count > 0 ? Math.Round(domain.Reviews.Average(x => x.Stars), 2) : 0));
            /*.ForMember(dto => dto.StartDate, opt => opt.MapFrom(domain => domain.StartDate.AddDays(1)))
            .ForMember(dto => dto.EndDate, opt => opt.MapFrom(domain => domain.EndDate.AddDays(1)));*/
            CreateMap<TripDto, Trip>();

            CreateMap<Role, RoleDto>();
            CreateMap<RoleDto, Role>();

            CreateMap<Review, ReviewDto>();
            CreateMap<ReviewDto, Review>();

            CreateMap<Conversation, ConversationDto>();
            CreateMap<ConversationDto, Conversation>();

            CreateMap<Message, MessageDto>();
            CreateMap<MessageDto, Message>();

            CreateMap<SelectedTripResult, SelectedTripResultDto>();
            CreateMap<SelectedTripResultDto, SelectedTripResult>();

            CreateMap<DetailedTrip, DetailedTripDto>();
            CreateMap<DetailedTripDto, DetailedTrip>();

            CreateMap<Notification, NotificationDto>();
            CreateMap<NotificationDto, Notification>();
        }
    }
}
