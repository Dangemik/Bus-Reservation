using BusReservation.Model;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace BusReservation.Hubs
{
    public class SeatHub : Hub
    {
        public async Task RefreshSeats(Seats seats)
        {
            await Clients.All.SendAsync("OccupiedSeats", seats);
        }
    }
}
