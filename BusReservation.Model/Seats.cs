using System;
using System.Collections.Generic;
using System.Text;

namespace BusReservation.Model
{
    public class Seats
    {
        public int BusRouteId { get; set; }
        public DateTime TravelDate { get; set; }
        public List<int> OccupiedSeats { get; set; }
    }
}
