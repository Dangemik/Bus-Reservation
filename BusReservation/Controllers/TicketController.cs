using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusReservation.DAL.Interface;
using BusReservation.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BusReservation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {

        private readonly ITicketRepository _ticketRepository;
        private readonly IUserRepository _userRepository;

        public TicketController(ITicketRepository ticketRepository, IUserRepository userRepository)
        {
            _ticketRepository = ticketRepository;
            _userRepository = userRepository;
        }


        // GET: api/<TicketController>
        [HttpGet]
        [Authorize(Policy = Policies.Admin)]
        public async Task<IEnumerable<TicketResponse>> GetTickets()
        {
            var tickets = await _ticketRepository.GetTickets();

            var ticketsResponse = tickets
                .GroupBy(t => t.TicketNumber)
                .Select(tr => new TicketResponse
                {
                    TicketNumber = tr.Key,
                    TravelDate = tr.First().TravelDate,
                    Seats = tr.Select(x => x.Seat).ToList(),
                    BusRoute = tr.First().BusRoute,
                    User = tr.First().User,
                    SelectedDiscountTickets = tr.Select(x => x.Discount)
                    .GroupBy(d => d.DiscountId)
                    .Select(
                        di => new DiscountKeyValues
                        {
                            Discount = di.First(),
                            NumberSeats = di.Count()
                        }
                        ).ToList(),
                    CreationDate = tr.First().CreationDate,
                    IsBought = tr.First().IsBought
                }).ToList();

            return ticketsResponse;
        }

        [HttpGet("GetAllOccupiedSeats")]
        public async Task<IEnumerable<int>> GetAllOccupiedSeatsForRoute([FromQuery] int busRouteId, [FromQuery] DateTime travelDate)
        {
            return await _ticketRepository.GetAllOccupiedSeatsForRoute(busRouteId, travelDate);
        }

        // POST api/<TicketController>
        [HttpPost]
        public async Task<int> AddTickets([FromBody] TicketsDTO tickets)
        {
            var user = await _userRepository.CheckIfTheUserExists(tickets.User);
            if (user == null)
            {
                user = await _userRepository.AddUser(tickets.User);
            }

            // Transformation discount to list
            List<int> discountList = new List<int>();

            foreach (var selectedDiscount in tickets.SelectedDiscountTickets)
            {
                for (int i = 0; i < selectedDiscount.NumberSeats; i++)
                {
                    discountList.Add(selectedDiscount.Discount.DiscountId);
                }
            }
            var ticketNumber = (await _ticketRepository.GetNextTicketNumber()) + 1;
            for (int i = 0; i < tickets.Seats.Count(); i++)
            {
                await _ticketRepository.AddTicket(ticketNumber, tickets.TravelDate, tickets.Seats[i], discountList[i], tickets.BusRoute.BusRouteId, (int)user.UserId, tickets.IsBought);
            }

            return ticketNumber;

        }
    }
}
