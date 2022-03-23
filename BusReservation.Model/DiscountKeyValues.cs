using System;
using System.Collections.Generic;
using System.Text;

namespace BusReservation.Model
{
    public class DiscountKeyValues
    {
        public int Key { get; set; }
        public int NumberSeats { get; set; }
        public Discount Discount { get; set; }

    }
}
