using System.Data;
using System.Data.SqlClient;

namespace BusReservation.DAL.Context
{
    public class BusReservationDapperContext
    {
        private string ConnectionString { get; set; }

        public IDbConnection Connection
        {
            get
            {
                return new SqlConnection(this.ConnectionString);
            }
        }
        public BusReservationDapperContext(string connectionString)
        {
            ConnectionString = connectionString;
        }
    }
}
