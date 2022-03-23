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
    public class DiscountRepository : BusReservationDapperContext, IDiscountRepository
    {
        public DiscountRepository(string connectionString) : base(connectionString)
        {
        }

        public async Task<IEnumerable<Discount>> GetDiscounts()
        {
            string sql = @"
                SELECT DiscountId, DiscountName, PercentageDiscount, CreationDate, DeletionDate
                FROM Discount
                WHERE DeletionDate is NULL";

            using (var connection = Connection)
            {
                return await connection.QueryAsync<Discount>(sql);
            }
        }
        public async Task AddDiscount(Discount discount)
        {
            string sql = @"
                INSERT INTO Discount (DiscountName, PercentageDiscount, CreationDate)
                VALUES(@DiscountName, @percentageDiscount, GETDATE())";

            using (var connection = Connection)
            {
                await connection.ExecuteAsync(sql, new
                {
                    discountName = discount.DiscountName,
                    percentageDiscount = discount.PercentageDiscount
                });
            }
        }

        public async Task UpdateDiscount(Discount discount)
        {
            string sql = @"
                UPDATE Discount
                SET DiscountName = @discountName, PercentageDiscount = @percentageDiscount
                WHERE DiscountId = @discountId";

            using (var connection = Connection)
            {
                await connection.ExecuteAsync(sql, new
                {
                    discountId = discount.DiscountId,
                    discountName = discount.DiscountName,
                    percentageDiscount = discount.PercentageDiscount
                });
            }
        }

        public async Task DeleteDiscount(int discountId)
        {
            string sql = @"
                UPDATE Discount
                SET DeletionDate = GETDATE()
                WHERE DiscountId = @discountId;";

            using (var connection = Connection)
            {
                await connection.ExecuteAsync(sql, new
                {
                    discountId
                });
            }
        }

    }
}
