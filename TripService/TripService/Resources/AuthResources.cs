using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TripService.Models.Domain;

namespace TripService.Resources
{
    public class AuthResources
    {
        public static string GenerateToken(User user)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(StringResources.AccessTokenSecret));
            var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var claims = GetClaims(user);

            var tokenOptions = GetTokenOptions(claims, signingCredentials);

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }

        private static JwtSecurityToken GetTokenOptions(List<Claim> claims, SigningCredentials signingCredentials)
        {
            return new JwtSecurityToken(
                issuer: "http://localhost:44357",
                audience: "http://localhost:44357",
                claims: claims,
                expires: DateTime.Now.AddSeconds(20),
                signingCredentials: signingCredentials
            );
        }

        private static List<Claim> GetClaims(User user)
        {
            return new List<Claim>
            {
                new Claim("Id", user.Id.ToString()),
                        new Claim(ClaimTypes.Email, user.Email),
                        new Claim("Provider", user.AccountProvider.ToString()),
                        new Claim(ClaimTypes.Role, user.Role.RoleName)
            };
        }

    }
}
