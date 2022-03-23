using BusReservation.DAL.Interface;
using BusReservation.DAL.Repositories;
using BusReservation.Services;
using Microsoft.Extensions.DependencyInjection;


namespace BusReservation.Extension
{
    public static class ServiceInjection
    {
        public static void InjectBusReservation(this Startup startup, IServiceCollection services)
        {
            services.AddTransient(handler => new BusRepository(startup.GetConnectionStringToBusReservation()));
            services.AddTransient<IBusRepository>(handler => handler.GetService<BusRepository>());

            services.AddTransient(handler => new BusRouteRepository(startup.GetConnectionStringToBusReservation()));
            services.AddTransient<IBusRouteRepository>(handler => handler.GetService<BusRouteRepository>());

            services.AddTransient(handler => new UserRepository(startup.GetConnectionStringToBusReservation()));
            services.AddTransient<IUserRepository>(handler => handler.GetService<UserRepository>());

            services.AddTransient(handler => new TicketRepository(startup.GetConnectionStringToBusReservation()));
            services.AddTransient<ITicketRepository>(handler => handler.GetService<TicketRepository>());

            services.AddTransient(handler => new DiscountRepository(startup.GetConnectionStringToBusReservation()));
            services.AddTransient<IDiscountRepository>(handler => handler.GetService<DiscountRepository>());

            services.AddTransient<IDriverService, DriverService>();
        }

        public static string GetConnectionStringToBusReservation(this Startup startup)
        {
            return startup.Configuration["Bus:ConStr"];
        }
    }
}
