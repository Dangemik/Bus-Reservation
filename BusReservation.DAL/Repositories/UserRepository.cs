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
    public class UserRepository : BusReservationDapperContext, IUserRepository
    {
        public UserRepository(string connectionString) : base(connectionString)
        {
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            string sql = @"
                    SELECT UserId, FirstName, Surname, Phone, Email, CreationDate, DeletionDate, IsDriver
                    FROM Users
                    WHERE DeletionDate is NULL";
            using (var connection = Connection)
            {
                return await connection.QueryAsync<User>(sql);
            }
        }

        public async Task<IEnumerable<User>> GetDrivers()
        {
            string sql = @"
                    SELECT UserId, FirstName, Surname, Phone, Email, CreationDate, DeletionDate, IsDriver
                    FROM Users
                    WHERE DeletionDate is NULL and IsDriver = 1";
            using (var connection = Connection)
            {
                return await connection.QueryAsync<User>(sql);
            }
        }
        public async Task<User> CheckIfTheUserExists(User user)
        {
            string sql = @"
              SELECT UserId, FirstName, Surname, Phone, Email, CreationDate, DeletionDate, IsDriver
              FROM [BusReservation].[dbo].[Users]
              WHERE FirstName=@firstName AND Surname=@surname AND Phone=@phone AND Email=@email AND DeletionDate is NULL";

            using (var connection = Connection)
            {
                return await connection.QueryFirstOrDefaultAsync<User>(sql, new
                {
                    firstName = user.FirstName,
                    surname = user.Surname,
                    phone = user.Phone,
                    email = user.Email
                });
            }
        }
        public async Task<User> AddUser(User user)
        {
            string sql = @"
                INSERT INTO Users (FirstName, Surname, Phone, Email, CreationDate, IsDriver)
                VALUES (@firstName, @surname, @phone, @email, GETDATE(), @isDriver);
                SELECT UserId, FirstName, Surname, Phone, Email, CreationDate, DeletionDate, IsDriver FROM Users
                WHERE UserId=(SELECT CAST(SCOPE_IDENTITY() as int));";

            using (var connection = Connection)
            {
                return await connection.QueryFirstAsync<User>(sql, new
                {
                    firstName = user.FirstName,
                    surname = user.Surname,
                    phone = user.Phone,
                    email = user.Email,
                    isDriver = user.IsDriver
                });
            }
        }

        public async Task UpdateUser(User user)
        {
            string sql = @"
                UPDATE Users
                SET FirstName = @firstName, Surname = @surname, Phone = @phone, Email = @email, IsDriver = @isDriver
                WHERE UserId = @userId;";

            using (var connection = Connection)
            {
                await connection.ExecuteAsync(sql, new 
                {
                    userId = user.UserId,
                    firstName = user.FirstName,
                    surname = user.Surname,
                    phone = user.Phone,
                    email = user.Email,
                    isDriver = user.IsDriver
                });
            }
        }      

        public async Task DeleteUser(int userId)
        {
            string sql = @"
                UPDATE Users
                SET DeletionDate = GETDATE()
                WHERE UserId = @userId;";

            using (var connection = Connection)
            {
                await connection.ExecuteAsync(sql, new
                {
                    userId
                });
            }
        }

    }
}
