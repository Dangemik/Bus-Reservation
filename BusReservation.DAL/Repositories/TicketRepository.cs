using BusReservation.DAL.Context;
using BusReservation.DAL.Interface;
using BusReservation.Model;
using Dapper;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BusReservation.DAL.Repositories
{
    public class TicketRepository : BusReservationDapperContext, ITicketRepository
    {
        public TicketRepository(string connectionString) : base(connectionString)
        {
        }

        public async Task<IEnumerable<Ticket>> GetTickets()
        {
            string sql = @"
                SELECT T.TicketId, T.TicketNumber, T.TravelDate, T.Seat, T.CreationDate, T.DeletionDate, T.IsBought,
		                BR.BusRouteId, BR.FromStation, BR.ToStation, BR.NumberKm, BR.Price, BR.ThroughStations, BR.Hour, BR.Minute, BR.CreationDate, BR.DeletionDate,
		                B.BusId,  B.BusCompany, B.NumberOfSeats, B.CreationDate, B.DeletionDate,
		                U.UserId, U.FirstName, U.Surname, U.Phone, U.Email, U.CreationDate, U.DeletionDate,
		                D.DiscountId, D.DiscountName, D.PercentageDiscount, D.CreationDate, D.DeletionDate
                FROM Tickets T 
                join BusRoute BR on(T.BusRouteId = BR.BusRouteId) 
                join Bus B on(BR.BusId = B.BusId)
                join Users U on(T.UserId = U.UserId)
                join Discount D on(T.DiscountId = D.DiscountId)
                WHERE T.DeletionDate IS NULL";

            using (var connection = Connection)
            {
                var x = await connection.QueryAsync<Ticket, BusRoute, Bus, User, Discount, Ticket>(
                     sql,
                     (ticket, busRoute, bus, user, discount) =>
                     {
                         busRoute.Bus = bus;
                         ticket.BusRoute = busRoute;
                         ticket.User = user;
                         ticket.Discount = discount;
                         return ticket;
                     }, splitOn: "BusRouteId, BusId, UserId, DiscountId");

                return x;
            }

        }

        public async Task<IEnumerable<Ticket>> GetTicketsForDriver(int busRouteId)
        {
            string sql = @"
                SELECT T.TicketId, T.TicketNumber, T.TravelDate, T.Seat, T.CreationDate, T.DeletionDate, T.IsBought,
		                    BR.BusRouteId, BR.FromStation, BR.ToStation, BR.NumberKm, BR.Price, BR.ThroughStations, BR.Hour, BR.Minute, BR.CreationDate, BR.DeletionDate,
		                    B.BusId,  B.BusCompany, B.NumberOfSeats, B.CreationDate, B.DeletionDate,
		                    U.UserId, U.FirstName, U.Surname, U.Phone, U.Email, U.CreationDate, U.DeletionDate,
		                    D.DiscountId, D.DiscountName, D.PercentageDiscount, D.CreationDate, D.DeletionDate
                    FROM Tickets T 
                    join BusRoute BR on(T.BusRouteId = BR.BusRouteId) 
                    join Bus B on(BR.BusId = B.BusId)
                    join Users U on(T.UserId = U.UserId)
                    join Discount D on(T.DiscountId = D.DiscountId)
                    WHERE T.DeletionDate IS NULL and T.BusRouteId=@busRouteId and T.TravelDate=Convert(date, getdate())";

            using (var connection = Connection)
            {
                var x = await connection.QueryAsync<Ticket, BusRoute, Bus, User, Discount, Ticket>(
                     sql,
                     (ticket, busRoute, bus, user, discount) =>
                     {
                         busRoute.Bus = bus;
                         ticket.BusRoute = busRoute;
                         ticket.User = user;
                         ticket.Discount = discount;
                         return ticket;
                     }, splitOn: "BusRouteId, BusId, UserId, DiscountId", 
                     param: new
                     {
                         busRouteId
                     });

                return x;
            }
        }


        public async Task<IEnumerable<int>> GetAllOccupiedSeatsForRoute(int busRouteId, DateTime travelDate)
        {
            string sql = @"
                SELECT Seat
                FROM [BusReservation].[dbo].[Tickets] ti join BusRoute br on(ti.BusRouteId=br.BusRouteId)
                WHERE br.BusRouteId=@busRouteId AND TravelDate=@travelDate AND ti.DeletionDate is NULL
                ";

            using (var connection = Connection)
            {
                return await connection.QueryAsync<int>(sql, new
                {
                    busRouteId,
                    travelDate
                });
            }
        }


        public async Task AddTicket(int ticketNumber, DateTime travelDate, int seat, int discountId, int busRouteId, int userId, bool isBought)
        {
            string sql = @"
                INSERT INTO Tickets (TicketNumber, TravelDate, Seat, DiscountId, BusRouteId, UserId, CreationDate, IsBought)
                VALUES(@ticketNumber, @travelDate, @seat, @discountId, @busRouteId, @userId, GETDATE(), @isBought);
            ";

            using (var connection = Connection)
            {
                await connection.ExecuteAsync(sql, new
                {
                    ticketNumber,
                    travelDate,
                    seat,
                    discountId,
                    busRouteId,
                    userId,
                    isBought
                });
            }
        }

        public async Task<int> GetNextTicketNumber()
        {
            string sql = @"
                SELECT TOP 1 TicketNumber FROM Tickets
                ORDER BY TicketNumber DESC";

            using (var connection = Connection)
            {
                return await connection.QuerySingleOrDefaultAsync<int>(sql);
            }
        }
    }
}
