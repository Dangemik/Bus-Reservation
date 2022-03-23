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
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository = null)
        {
            _userRepository = userRepository;
        }
        // GET: api/<UserController>
        [HttpGet]
        [Authorize(Policy = Policies.Admin)]
        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _userRepository.GetUsers();
        }
        [HttpGet("divers")]
        [Authorize(Policy = Policies.Admin)]
        public async Task<IEnumerable<User>> GetDrivers()
        {
            return await _userRepository.GetDrivers();
        }

        // POST api/<UserController>
        [HttpPost]
        [Authorize(Policy = Policies.Admin)]
        public async Task AddUser([FromBody] User user)
        {
            var userInDatabase = await _userRepository.CheckIfTheUserExists(user);
            if(userInDatabase == null)
            {
                await _userRepository.AddUser(user);
            }
        }

        // PUT api/<UserController>/5
        [HttpPut]
        [Authorize(Policy = Policies.Admin)]
        public async Task UpdateUser([FromBody] User user)
        {
            await _userRepository.UpdateUser(user);
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        [Authorize(Policy = Policies.Admin)]
        public async Task DeleteUser(int id)
        {
            await _userRepository.DeleteUser(id);
        }
    }
}
