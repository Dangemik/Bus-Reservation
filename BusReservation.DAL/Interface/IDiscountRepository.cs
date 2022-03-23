using BusReservation.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BusReservation.DAL.Interface
{
    public interface IDiscountRepository
    {
        Task<IEnumerable<Discount>> GetDiscounts();
        Task AddDiscount(Discount discount);
        Task UpdateDiscount(Discount discount);
        Task DeleteDiscount(int discountId);
    }
}
