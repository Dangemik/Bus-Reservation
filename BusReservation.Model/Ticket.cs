using System;
using System.Collections.Generic;
using System.Text;

namespace BusReservation.Model
{
    public class Ticket
    {
        public int TicketId { get; set; }
        public int TicketNumber { get; set; }
        public DateTime TravelDate { get; set; }
        public int Seat { get; set; }
        public Discount Discount { get; set; }
        public BusRoute BusRoute { get; set; }
        public User User { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime DeletionDate { get; set; }
        public bool IsBought { get; set; }
    }
}
