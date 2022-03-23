using System;
using System.Collections.Generic;
using System.Text;

namespace BusReservation.Model
{
    public class User
    {
        public int? UserId { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime DeletionDate { get; set; }
        public bool IsDriver { get; set; }
    }
}
