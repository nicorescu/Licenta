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
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(StringResources.AccessTokenSecret));
                var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var claims = new[]
                {
                        new Claim("Id", result.Id.ToString()),
                        new Claim("Email", result.Email),
                        new Claim("Provider", result.AccountProvider.ToString()),
                        new Claim("Role", result.Role.ToString())
                    };

                var tokenOptions = new JwtSecurityToken(
                issuer: " ",
                audience: "http://localhost:44357",
                claims: claims,
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: signingCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

                return tokenString;
            }

            return null;
        }

        public async Task<string> Signup(User user)
        {
            User result;
            if (user.Password != null)
            {
                result = await _collection.FindAsync(u => u.Email == user.Email && u.Password == user.Password).Result.FirstOrDefaultAsync();
            }
            else
            {
                result = await _collection.FindAsync(u => u.Email == user.Email && u.AccountProvider == user.AccountProvider).Result.FirstOrDefaultAsync();
            }

            if (result != null)
            {
                try
                {
                    await _collection.InsertOneAsync(user);
                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(StringResources.AccessTokenSecret));
                    var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                    var claims = new[]
                    {
                        new Claim("Id", result.Id.ToString()),
                        new Claim(ClaimTypes.Email, result.Email),
                        new Claim("Provider", result.AccountProvider.ToString()),
                        new Claim(ClaimTypes.Role, result.Role.RoleName)
                    };

                    var tokenOptions = new JwtSecurityToken(
                    issuer: " ",
                    audience: "http://localhost:44357",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signingCredentials
                    );

                    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

                    return tokenString;
                }
                catch (Exception exception)
                {
                    Console.WriteLine(exception);
                    return null;
                }
            }

            return null;
        }
    }
}
