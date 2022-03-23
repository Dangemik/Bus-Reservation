using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmailService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BusReservation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailSender _emailSender;

        public EmailController(IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }

        [HttpPost]
        public async Task Post()
        {
            var files = Request.Form.Files.Any() ? Request.Form.Files : new FormFileCollection();
            var email = Request.Form.ToDictionary(x => x.Key == "email").Values.FirstOrDefault();

            var message = new Message(new string[] { email.Value }, "Bilet autobusowy", 
                "Drogi kliencie," +
                "<br>Dziękujemy za rezewację biletu autobusowego." +
                "<br>Poniżej znajduje się rezerwacja, którą należy wydrukować lub pobrać na urządenie mobilne." +
                "<br>Życzymy przyjemnej podróży.<br>Firma XYZ", 
                files);
            await _emailSender.SendEmail(message);
        }       
    }
}
