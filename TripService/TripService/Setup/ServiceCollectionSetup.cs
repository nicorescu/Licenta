using Microsoft.AspNetCore.Authentication.JwtBearer;
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
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TripService.Resources;
using TripService.MongoUtils;

namespace TripService.Setup
{
    public class ServiceCollectionSetup
    {
        public static void TryAddMongoConnection(IServiceCollection services)
        {
            services.TryAddSingleton<IUserRepository, UserRepository>();
            services.TryAddSingleton<ITripRepository, TripRepository>();
            services.TryAddSingleton<IRoleRepository, RoleRepository>();
            services.TryAddSingleton<IAuthRepository, AuthRepository>();
            services.TryAddSingleton<IUserUtils, UserUtils>();
        }

        public static void AddAutomapper(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(MapperProfile).Assembly);
        }

        public static void TryAddAllServices(IServiceCollection services)
        {
            services.TryAddScoped<ITripProcessor, TripProcessor>();
            services.TryAddScoped<IUserProcessor, UserProcessor>();
            services.TryAddScoped<IRoleProcessor, RoleProcessor>();
            services.TryAddScoped<IAuthProcessor, AuthProcessor>();
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

        public static void AddAuthentication(IServiceCollection services)
        {
            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ClockSkew = TimeSpan.Zero,
                    ValidIssuer = "http://localhost:44357",
                    ValidAudience = "http://localhost:44357",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(StringResources.AccessTokenSecret))
                };
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
            });
        }

        public static void AddCors(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("EnableCORS", builder =>
                {
                    builder.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .WithExposedHeaders("X-Count");
                });

                options.AddPolicy("CorsPolicy", builder =>
                {
                    builder.WithOrigins("http://localhost:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()
                    .WithExposedHeaders("X-Count");
                });
            });
        }
    }
}
