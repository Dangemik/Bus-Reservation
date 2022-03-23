using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using BusReservation.DAL.Interface;
using BusReservation.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BusReservation.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class BusController : Controller
    {

        private readonly IBusRepository _busRepository;
        private readonly IBusRouteRepository _busRouteRepository;


        public BusController(IBusRepository busRepository, IBusRouteRepository busRouteRepository)
        {
            _busRepository = busRepository;
            _busRouteRepository = busRouteRepository;
        }

        [HttpGet]
        [Authorize(Policy = Policies.Admin)]
        public async Task<IEnumerable<Bus>> GetBuses()
        {
            return await _busRepository.GetBuses();
        }

        [HttpPost]
        [Authorize(Policy = Policies.Admin)]
        public async Task PostBus([FromBody] Bus bus)
        {
            await _busRepository.AddBus(bus);
        }

        [HttpPut]
        [Authorize(Policy = Policies.Admin)]
        public async Task UpdateBus([FromBody] Bus bus)
        {
            await _busRepository.UpdateBus(bus);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = Policies.Admin)]
        public async Task DeleteBus(int id)
        {
            var busRoutesId = await _busRouteRepository.GetRelatedBusRoutesWithBus(id);
            foreach (var busRouteId in busRoutesId)
            {
                await _busRouteRepository.DeleteBusRoute(busRouteId);
            }

            await _busRepository.DeleteBus(id);
          
        }
    }
}
