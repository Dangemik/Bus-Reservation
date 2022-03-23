using System;
using System.Collections.Generic;
using System.Text;

namespace BusReservation.Model
{
    public class Bus
    {
        public int BusId { get; set; }
        public string BusCompany { get; set; }
        public int NumberOfSeats { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime DeletionDate { get; set; }

    }
}
