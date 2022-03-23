using BusReservation.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BusReservation.DAL.Interface
{
    public interface IBusRouteRepository
    {
        Task<IEnumerable<BusRoute>> GetBusRoutes();
        Task<IEnumerable<int>> GetRelatedBusRoutesWithBus(int busId);
        Task<int> AddBusRoute(BusRoute busRoute);
        Task UpdateBusRoute(BusRoute busRoute);
        Task DeleteBusRoute(int busRouteId);


    }
}
