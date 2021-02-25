using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Models.Mapping;
using TripService.Processors;
using TripService.Repositories;

namespace TripService.Setup
{
    public class ServiceCollectionSetup
    {
        public static void TryAddMongoConnection(IServiceCollection services)
        {
            services.TryAddSingleton<IUserRepository, UserRepository>();
            services.TryAddSingleton<ITripRepository, TripRepository>();
        }

        public static void AddAutomapper(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(MapperProfile).Assembly);
        }

        public static void TryAddAllServices(IServiceCollection services)
        {
            services.TryAddScoped<ITripProcessor, TripProcessor>();
            services.TryAddScoped<IUserProcessor, UserProcessor>();
        }

        public static void AddCors(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });
        }

        public static void AddSwagger(IServiceCollection services)
        {
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
                {
                    Title = "Swagger Demo API",
                    Description = "Demo API for showing Swagger",
                    Version = "v1"
                });
            });
        }
    }
}
