using BusReservation.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusReservation.Services
{
    public interface IDriverService
    {
        Task SendEmailToDriver(int busRouteId, string email);
    }
}
