using System;
using System.Collections.Generic;
using System.Text;

namespace BusReservation.Model
{
    public class TicketResponse
    {
        public int TicketNumber { get; set; }
        public DateTime TravelDate { get; set; }
        public List<int> Seats { get; set; }
        public BusRoute BusRoute { get; set; }
        public User User { get; set; }
        public List<DiscountKeyValues> SelectedDiscountTickets { get; set; }
        public DateTime CreationDate { get; set; }
        public bool IsBought { get; set; }


    }
}
