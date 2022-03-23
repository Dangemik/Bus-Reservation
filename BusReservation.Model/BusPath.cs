using System;

namespace BusReservation.Model
{
    public class BusRoute
    {
        public int BusRouteId { get; set; }
        public string FromStation { get; set; }
        public string ToStation { get; set; }
        public int NumberKm { get; set; }
        public float Price { get; set; }
        public string ThroughStations { get; set; }
        public int Hour { get; set; }
        public int Minute { get; set; }

        public Bus Bus { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime DeletionDate { get; set; }
        public User User { get; set; }
    }
}
