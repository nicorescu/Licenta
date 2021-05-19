using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Models.Domain;
using TripService.Resources;

namespace TripService.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _collection;

        public UserRepository(IMongoClient mongoClient)
        {
            _collection = mongoClient.GetDatabase(StringResources.DatabaseName).GetCollection<User>(StringResources.UserCollectionName);
        }
        public async Task<List<User>> GetAllUsers()
        {
            try
            {
                var result = await _collection.FindAsync(user => true);
                return result.ToList();
            }
            catch(Exception exception)
            {
                Console.WriteLine(exception.ToString());
                return null;
            }
            
        }

        public async Task<User> GetUserById(Guid userId)
        {
            try
            {
                var result = await _collection.FindAsync(user => user.Id == userId);
                return result.FirstOrDefault(); ;
            }
            catch(Exception exception)
            {
                Console.WriteLine(exception.ToString());
                return null;
            }
            
        }

        public async Task<bool> InsertNewUser(User user)
        {
            try
            {
                user.Id = Guid.NewGuid();
                 await _collection.InsertOneAsync(user);
                return true;
            }
            catch (Exception exception)
            {
                Console.WriteLine("Exceptieeee: " + exception.ToString());
                return false;
            }
        }

        public async Task<bool> UpdateUser(Guid userId, User user)
        {
            try
            {
                ReplaceOneResult result = await _collection.ReplaceOneAsync(user => user.Id == userId, user);
                return (result.IsAcknowledged || result.ModifiedCount > 0) ? true : false;
            }
            catch (Exception exception)
            {
                Console.WriteLine("Exceptieeee: " + exception.ToString());
                return false;
            }
        }


        public async Task<bool> DeleteUser(Guid userId)
        {
            try
            {
                DeleteResult result = await _collection.DeleteOneAsync(user => user.Id == userId);

                return (result.IsAcknowledged || result.DeletedCount > 0) ? true : false;
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.ToString());
                return false;
            }
        }

       public async Task<List<User>> GetUsersByIds(List<Guid> ids)
        {
            try
            {
                var result = await _collection.FindAsync(user => ids.Contains(user.Id));

                return result.ToList();
            } catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

    }
}
