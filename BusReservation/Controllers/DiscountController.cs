using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusReservation.DAL.Interface;
using BusReservation.Model;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BusReservation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountController : ControllerBase
    {
        private readonly IDiscountRepository _discountRepository;

        public DiscountController(IDiscountRepository discountRepository)
        {
            _discountRepository = discountRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Discount>> GetDiscounts()
        {
            return await _discountRepository.GetDiscounts();
        }

        [HttpPost]
        public async Task AddDiscount([FromBody] Discount discount)
        {
            await _discountRepository.AddDiscount(discount);
        }

        [HttpPut]
        public async Task UpdateDiscount([FromBody] Discount discount)
        {
            await _discountRepository.UpdateDiscount(discount);
        }

        [HttpDelete("{id}")]
        public async Task DeleteDiscount(int id)
        {
            await _discountRepository.DeleteDiscount(id);
        }
    }
}
