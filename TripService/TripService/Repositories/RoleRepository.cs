using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Models.Domain;
using TripService.Resources;

namespace TripService.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly IMongoCollection<Role> _collection;
        public RoleRepository(IMongoClient mongoClient)
        {
            _collection = mongoClient.GetDatabase(StringResources.DatabaseName).GetCollection<Role>(StringResources.roleCollectionName);

        }
        public async Task<List<Role>> GetAllRoles()
        {
            try
            {
                var result = await _collection.FindAsync(role => true);
                return result.ToList();
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.ToString());
                return null;
            }
        }

        public async Task<bool> InsertNewRole(Role role)
        {
            try
            {
                await _collection.InsertOneAsync(role);
                return true;
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.ToString());
                return false;
            }
        }

        public async Task<bool> DeleteRole(Guid roleId)
        {
            try
            {
                DeleteResult result = await _collection.DeleteOneAsync(user => user.Id == roleId);

                return (result.IsAcknowledged || result.DeletedCount > 0) ? true : false;
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.ToString());
                return false;
            }
        }


    }
}
