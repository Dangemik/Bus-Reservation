using BusReservation.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BusReservation.DAL.Interface
{
    public interface IBusRepository
    {
        Task<IEnumerable<Bus>> GetBuses();
        Task AddBus(Bus bus);
        Task UpdateBus(Bus bus);
        Task DeleteBus(int busId);
    }
}
