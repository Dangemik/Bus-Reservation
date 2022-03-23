using BusReservation.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BusReservation.DAL.Interface
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetUsers();
        Task<IEnumerable<User>> GetDrivers();
        Task<User> CheckIfTheUserExists(User user);
        Task<User> AddUser(User user);
        Task UpdateUser(User user);
        Task DeleteUser(int userId);
    }
}
