using System;
using System.Collections.Generic;
using System.Text;

namespace BusReservation.Model
{
    public class Discount
    {
        public int DiscountId { get; set; }
        public string DiscountName { get; set; }
        public int PercentageDiscount { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime DeletionDate { get; set; }
    }
}
