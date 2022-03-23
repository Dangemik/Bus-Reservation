using BusReservation.DAL.Interface;
using BusReservation.Model;
using EmailService;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace BusReservation.Services
{
    public class DriverService : IDriverService
    {
        private readonly ITicketRepository _ticketRepository;
        private readonly IEmailSender _emailSender;

        public DriverService(ITicketRepository ticketRepository, IEmailSender emailSender)
        {
            _ticketRepository = ticketRepository;
            _emailSender = emailSender;
        }

        public async Task SendEmailToDriver(int busRouteId, string email)
        {
            string tableForDriver = "";
            var tickets = await _ticketRepository.GetTicketsForDriver(busRouteId);

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

            foreach (var ticket in ticketsResponse)
            {
                tableForDriver += "<tr><td style = 'border: 1px solid; text-align: left'>" + ticket.TicketNumber + "</td>";
                tableForDriver += "<td style = 'border: 1px solid; text-align: left'>" + ticket.TravelDate.ToString("dd/M/yyyy", CultureInfo.InvariantCulture) + "</td>";
                tableForDriver += "<td style = 'border: 1px solid; text-align: left'>" + string.Join(", ", ticket.Seats.Select(n => n.ToString()).ToArray()) + "</td>";
                tableForDriver += "<td style = 'border: 1px solid; text-align: left'>" + ticket.User.FirstName + "</td>";
                tableForDriver += "<td style = 'border: 1px solid; text-align: left'>" + ticket.User.Surname + "</td>";
                tableForDriver += "<td style = 'border: 1px solid; text-align: left'>" + (ticket.IsBought ? "Zapłacone" : "Zarezerwowane") + "</td></tr>";
            }

            var message = new Message(new string[] { email }, "Bilety autobusowe na kurs " + busRouteId,
                "<h2>Pozniżej znajdują się biety na kurs o identyfikatorze numer <b>" + busRouteId + "</b><br></h2>"+
                @"
                <table style = 'font-family: arial, sans-serif; border-collapse: collapse; width: 100%;'>
                  <tr>
                    <th style = 'border: 1px solid; text-align: left'> Numer Biletu </th>
                    <th style = 'border: 1px solid; text-align: left'> Data Podrózy </th>
                    <th style = 'border: 1px solid; text-align: left'> Miejsca </th>
                    <th style = 'border: 1px solid; text-align: left'> Imię </th>
                    <th style = 'border: 1px solid; text-align: left'> Nazwisko </th>
                    <th style = 'border: 1px solid; text-align: left'> Stan </th>
                  </tr>
                 " + tableForDriver + "</table>" +               
                "<br>Życzymy przyjemnej podróży.<br>Firma XYZ",
                null);
            await _emailSender.SendEmail(message);
        }
    }
}
