using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TripService.Models.ApiModels;
using TripService.Models.Domain;
using TripService.Resources;

namespace TripService.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly IMongoCollection<User> _collection;

        public AuthRepository(IMongoClient mongoClient)
        {
            _collection = mongoClient.GetDatabase(StringResources.DatabaseName).GetCollection<User>(StringResources.UserCollectionName);
        }

        public async Task<string> Login(CredentialsModel credentials)
        {
            try
            {
                User result;
                if (credentials.Password != null)
                {
                    result = await _collection.FindAsync(User => User.Email == credentials.Email && User.Password == credentials.Password).Result.FirstOrDefaultAsync();
                }
                else
                {
                    result = await _collection.FindAsync(User => User.Email == credentials.Email && User.AccountProvider == credentials.AccountProvider).Result.FirstOrDefaultAsync();
                }
                if (result != null)
                {
                    return AuthResources.GenerateToken(result); ;
                }

                return null;
            } catch (Exception exception)
            {
                Console.WriteLine(exception.Message);
                return null;
            }
            
        }

        public async Task<string> Signup(User user)
        {
            User result = await _collection.FindAsync(u => u.Email == user.Email && u.AccountProvider == user.AccountProvider).Result.FirstOrDefaultAsync();

            if (result == null)
            {
                try
                {
                    await _collection.InsertOneAsync(user);
                    return AuthResources.GenerateToken(user);
                }
                catch (Exception exception)
                {
                    Console.WriteLine(exception);
                    return null;
                }
            }
            return "existing";
        }
    }
}
