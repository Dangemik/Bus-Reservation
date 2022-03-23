using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusReservation.DAL.Interface;
using BusReservation.Model;
using BusReservation.Services;
using Hangfire;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BusReservation.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class BusRouteController : Controller
    {
        private readonly IBusRouteRepository _busRouteRepository;
        private readonly IDriverService _driverService;


        public BusRouteController(IBusRouteRepository busRouteRepository, IDriverService driverService)
        {
            _busRouteRepository = busRouteRepository;
            _driverService = driverService;
        }

        [HttpGet]
        public async Task<IEnumerable<BusRoute>> GetBusRoutes()
        {
            return await _busRouteRepository.GetBusRoutes();
        }
       
        [HttpPost]
        [Authorize(Policy = Policies.Admin)]
        public async Task AddBusRoute([FromBody] BusRoute busRoute)
        {
            var busRouteId =  await _busRouteRepository.AddBusRoute(busRoute);

            DateTime reminder = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, busRoute.Hour, busRoute.Minute, 0);
            reminder = reminder.AddMinutes(-30);

            RecurringJob.AddOrUpdate(busRouteId.ToString(),
               () => _driverService.SendEmailToDriver(busRouteId, busRoute.User.Email),
               reminder.Minute + " " + reminder.Hour + " * * *", TimeZoneInfo.Local);

        }

        [HttpPut]
        [Authorize(Policy = Policies.Admin)]
        public async Task UpdateBusRoute([FromBody] BusRoute busRoute)
        {
            await _busRouteRepository.UpdateBusRoute(busRoute);

            DateTime reminder = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, busRoute.Hour, busRoute.Minute, 0);
            reminder = reminder.AddMinutes(-30);

            RecurringJob.AddOrUpdate(busRoute.BusRouteId.ToString(),
               () => _driverService.SendEmailToDriver(busRoute.BusRouteId, busRoute.User.Email),
               reminder.Minute + " " + reminder.Hour + " * * *", TimeZoneInfo.Local);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = Policies.Admin)]
        public async Task DeleteBusRoute(int id)
        {
            await _busRouteRepository.DeleteBusRoute(id);
            RecurringJob.RemoveIfExists(id.ToString());
        }
    }
}
