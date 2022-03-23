using BusReservation.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BusReservation.DAL.Interface
{
    public interface ITicketRepository
    {
        Task<IEnumerable<Ticket>> GetTickets();
        Task<IEnumerable<Ticket>> GetTicketsForDriver(int busRouteId);
        Task<IEnumerable<int>> GetAllOccupiedSeatsForRoute(int busRouteId, DateTime travelDate);
        Task AddTicket(int ticketNumber, DateTime travelDate, int seat, int discountId, int busRouteId, int userId, bool isBought);
        Task<int> GetNextTicketNumber();
    }
}
