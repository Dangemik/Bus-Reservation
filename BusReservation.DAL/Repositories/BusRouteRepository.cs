using BusReservation.DAL.Context;
using BusReservation.DAL.Interface;
using BusReservation.Model;
using Dapper;
using Serilog;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BusReservation.DAL.Repositories
{
    public class BusRouteRepository : BusReservationDapperContext, IBusRouteRepository
    {
        public BusRouteRepository(string connectionString) : base(connectionString)
        {
        }
        public async Task<IEnumerable<BusRoute>> GetBusRoutes()
        {
            string sql = @"
                SELECT BusRouteId, FromStation, ToStation, NumberKm, Price, ThroughStations, Hour, Minute, BP.CreationDate, BP.DeletionDate, 
		        B.BusId,  BusCompany, NumberOfSeats, B.CreationDate, 
		        U.UserId, U.FirstName, U.Surname, U.Phone, U.Email, U.CreationDate, U.DeletionDate, U.isDriver
	            FROM BusRoute BP 
                     join Bus B on(BP.BusID = B.BusId) 
                     join Users U on(BP.UserId = U.UserId)
	            WHERE BP.DeletionDate IS NULL";

            using (var connection = Connection)
            {
                var  x = await connection.QueryAsync<BusRoute, Bus, User, BusRoute>(
                    sql,
                    (busRoute, bus, user) =>
                    {
                        busRoute.Bus = bus;
                        busRoute.User = user;
                        return busRoute;
                    }, splitOn: "BusId, UserId");

                return x;
            } 
        }


        public async Task<int> AddBusRoute(BusRoute busRoute)
        {
            string sql = @"
                INSERT INTO BusRoute (FromStation, ToStation, NumberKm, Price, ThroughStations, Hour, Minute, BusId, CreationDate, UserId)
                VALUES(@fromStation, @toStation, @numberKm, @price, @throughStations, @hour, @minute, @busId, GETDATE(), @userId)
                SELECT BusRouteId FROM BusRoute
                WHERE BusRouteId=(SELECT CAST(SCOPE_IDENTITY() as int));";

            using (var connection = Connection)
            {
                return await connection.QueryFirstAsync<int>(sql, new
                {
                    fromStation = busRoute.FromStation,
                    toStation = busRoute.ToStation,
                    numberKm = busRoute.NumberKm,
                    price = busRoute.Price,
                    throughStations = busRoute.ThroughStations,
                    hour = busRoute.Hour,
                    minute = busRoute.Minute,
                    busId = busRoute.Bus.BusId,
                    userId = busRoute.User.UserId
                });
            }
        }

        public async Task UpdateBusRoute(BusRoute busRoute)
        {
            string sql = @"
                UPDATE BusRoute
                SET FromStation = @fromStation, 
                    ToStation = @toStation, 
                    NumberKm = @numberKm, 
                    Price = @price, 
                    ThroughStations = @throughStations,
                    Hour = @hour,
                    Minute = @minute,
                    BusId = @busId,
                    UserId = @userId 
                WHERE BusRouteId = @busRouteId;";

            using (var connection = Connection)
            {
                await connection.ExecuteAsync(sql, new
                {
                    busRouteId = busRoute.BusRouteId,
                    fromStation = busRoute.FromStation,
                    toStation = busRoute.ToStation,
                    numberKm = busRoute.NumberKm,
                    price = busRoute.Price,
                    throughStations = busRoute.ThroughStations,
                    hour = busRoute.Hour,
                    minute = busRoute.Minute,
                    busId = busRoute.Bus.BusId,
                    userId = busRoute.User.UserId
                });
            }
          
        }
        public async Task DeleteBusRoute(int busRouteId)
        {
            string sql = @"
                UPDATE BusRoute 
                SET DeletionDate = GETDATE()
                WHERE BusRouteId = @busRouteId;";

            using (var connection = Connection)
            {
                await connection.ExecuteAsync(sql, new
                {
                    busRouteId
                });
            }  
        }

        public async Task<IEnumerable<int>> GetRelatedBusRoutesWithBus(int busId)
        {
            string sql = @"
                SELECT BusRouteId
                FROM BusRoute
                where BusId=@busId AND DeletionDate IS NULL";

            using (var connection = Connection)
            {
                return await connection.QueryAsync<int>(sql, new
                {
                    busId
                });
            }
        }
    }
}
