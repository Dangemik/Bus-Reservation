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
    public class BusRepository : BusReservationDapperContext, IBusRepository
    {
        public BusRepository(string connectionString) : base(connectionString)
        {
        }

        public async Task<IEnumerable<Bus>> GetBuses()
        {
            string sql = @"
                SELECT BusId, BusCompany, NumberOfSeats, CreationDate, DeletionDate
                FROM Bus
                WHERE DeletionDate IS NULL";

            using (var connection = Connection)
            {
                return await connection.QueryAsync<Bus>(sql);
            }
           
        }
        public async Task AddBus(Bus bus)
        {
            string sql = @"
                INSERT INTO Bus (BusCompany, NumberOfSeats, CreationDate)
                VALUES(@busCompany, @numberOfSeats, GETDATE())";

            using (var connection = Connection)
            {
                await connection.ExecuteAsync(sql, new
                {
                    busCompany = bus.BusCompany,
                    numberOfSeats = bus.NumberOfSeats
                });
            }
           
        }

        public async Task UpdateBus(Bus bus)
        {
            string sql = @"
                UPDATE Bus
                SET BusCompany = @busCompany, NumberOfSeats = @numberOfSeats
                WHERE BusId = @busId;";

            using (var connection = Connection)
            {
                await connection.ExecuteAsync(sql, new
                {
                    busId = bus.BusId,
                    busCompany = bus.BusCompany,
                    numberOfSeats = bus.NumberOfSeats
                });
            } 
        }

        public async Task DeleteBus(int busId)
        {
            string sql = @"
                UPDATE Bus
                SET DeletionDate = GETDATE()
                WHERE BusId = @busId;";

            using (var connection = Connection)
            {
                await connection.ExecuteAsync(sql, new
                {
                    busId
                });
            }
           
        }
    }
}
