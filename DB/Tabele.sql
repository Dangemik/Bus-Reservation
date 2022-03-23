/* Create Bus */
CREATE TABLE Bus (
  BusId int IDENTITY(1,1) PRIMARY KEY,
  BusCompany varchar(255) NOT NULL,
  NumberOfSeats int NOT NULL,
  CreationDate datetime NOT NULL,
  DeletionDate datetime NULL
)

/* Create Users */
CREATE TABLE Users (
  UserId int IDENTITY(1,1) PRIMARY KEY,
  FirstName varchar(255) NOT NULL,
  Surname varchar(255) NOT NULL,
  Phone varchar(9) NOT NULL,
  Email varchar(255) NOT NULL,
  CreationDate datetime NOT NULL,
  DeletionDate datetime NULL,
  IsDriver Bit NOT NULL
)

/* Create BusPath */
CREATE TABLE BusRoute (
   BusRouteId int IDENTITY(1,1) PRIMARY KEY,
   FromStation varchar(255) NOT NULL,
   ToStation varchar(100) NOT NULL,
   NumberKm int NOT NULL,
   Price float NOT NULL,
   ThroughStations varchar(500) DEFAULT NULL,
   Hour int NOT NULL,
   Minute int NOT NULL,
   BusId int FOREIGN KEY REFERENCES Bus(BusId),
   CreationDate datetime NOT NULL,
   DeletionDate datetime NULL,
   UserId int FOREIGN KEY REFERENCES Users(UserId)
)


/* Create Discount */
CREATE TABLE Discount(
  DiscountId int IDENTITY(1,1) PRIMARY KEY,
  DiscountName varchar(255) NOT NULL,
  PercentageDiscount int NOT NULL,
  CreationDate datetime NOT NULL,
  DeletionDate datetime NULL
)

/* Create Tickets */
CREATE TABLE Tickets (
  TicketId int IDENTITY(1,1) PRIMARY KEY,
  TicketNumber int NOT NULL,
  TravelDate date NOT NULL,
  Seat int NOT NULL,
  DiscountId int FOREIGN KEY REFERENCES Discount(DiscountId),
  BusRouteId int FOREIGN KEY REFERENCES BusRoute(BusRouteId),
  UserId int FOREIGN KEY REFERENCES Users(UserId),
  CreationDate datetime NOT NULL,
  DeletionDate datetime NULL,
  IsBought Bit NOT NULL 
)


/* Data Bus*/
Insert into Bus (BusCompany, NumberOfSeats, CreationDate)
values ('Voyager', 48, GETDATE());
Insert into Bus (BusCompany, NumberOfSeats, CreationDate)
values ('Voyager', 48, GETDATE());
Insert into Bus (BusCompany, NumberOfSeats, CreationDate)
values ('Voyager', 48, GETDATE());

Insert into Bus (BusCompany, NumberOfSeats, CreationDate)
values ('Czecholoso', 40, GETDATE());
Insert into Bus (BusCompany, NumberOfSeats, CreationDate)
values ('Czecholoso', 40, GETDATE());
Insert into Bus (BusCompany, NumberOfSeats, CreationDate)
values ('Czecholoso', 48, GETDATE());

/* Data Users */
Insert into Users (FirstName, Surname, Phone, Email, CreationDate, IsDriver)
values ('Jan', 'Kowalski','999888777','Kowal@wp.pl', GETDATE(), 0);
Insert into Users (FirstName, Surname, Phone, Email, CreationDate, IsDriver)
values ('Jaœ', 'Fasola','999888771','fas@wp.pl', GETDATE(), 0);
Insert into Users (FirstName, Surname, Phone, Email, CreationDate, IsDriver)
values ('Marek', 'Loczek','999888772','Loczek@wp.pl', GETDATE(), 0);
Insert into Users (FirstName, Surname, Phone, Email, CreationDate, IsDriver)
values ('Aneta', 'Burak','999888773','Burak@wp.pl', GETDATE(), 0);
Insert into Users (FirstName, Surname, Phone, Email, CreationDate, IsDriver)
values ('Jan', 'Driver','999888776','busmailsender@gmail.com', GETDATE(), 1);


/* Data BusPath*/
Insert into BusRoute(FromStation, ToStation, NumberKm, Price, ThroughStations, hour, minute, BusID, CreationDate, UserId)
values ('Kraków G³ówny', 'Czêstochowa Stradom', 33, 23.2, 'Bary', 13, 30, 1, GETDATE(), 5);						
Insert into BusRoute(FromStation, ToStation, NumberKm, Price, ThroughStations, hour, minute, BusID, CreationDate, UserId)
values ('Kraków G³ówny', 'Czêstochowa Stradom', 100, 23.2, 'Bary, Sary', 13, 50, 2, GETDATE(), 5);					
Insert into BusRoute(FromStation, ToStation, NumberKm, Price, ThroughStations, hour, minute, BusID, CreationDate, UserId)
values ('Czêstochowa Stradom', 'Kraków G³ówny', 33, 23.2, 'Bary', 13, 30, 5, GETDATE(), 5);						
Insert into BusRoute(FromStation, ToStation, NumberKm, Price, ThroughStations, hour, minute, BusID, CreationDate, UserId)
values ('Nowy S¹cz', 'Tarnów', 50, 23.2, 'Koloso', 12, 30, 6, GETDATE(), 5);										
Insert into BusRoute(FromStation, ToStation, NumberKm, Price, ThroughStations, hour, minute, BusID, CreationDate, UserId)
values ('Tarnów', 'Nowy S¹cz', 50, 23.2, 'Koloso', 12, 10, 4, GETDATE(), 5);										
Insert into BusRoute(FromStation, ToStation, NumberKm, Price, ThroughStations, hour, minute, BusID, CreationDate, UserId)
values ('Kraków G³ówny', 'Czêstochowa Stradom', 33, 23.2, 'Bary', 14, 30, 2, GETDATE(), 5);						
Insert into BusRoute(FromStation, ToStation, NumberKm, Price, ThroughStations, hour, minute, BusID, CreationDate, UserId)
values ('Kraków G³ówny', 'Czêstochowa Stradom', 100, 23.2, 'Bary, Sary', 9, 50, 6, GETDATE(), 5);					
Insert into BusRoute(FromStation, ToStation, NumberKm, Price, ThroughStations, hour, minute, BusID, CreationDate, UserId)
values ('Kraków G³ówny', 'Czêstochowa Stradom', 33, 23.2, 'Bary', 20, 30, 5, GETDATE(), 5);					
Insert into BusRoute(FromStation, ToStation, NumberKm, Price, ThroughStations, hour, minute, BusID, CreationDate, UserId)
values ('Kraków G³ówny', 'Czêstochowa Stradom', 100, 23.2, 'Bary, Sary', 22, 02, 4, GETDATE(), 5);					
Insert into BusRoute(FromStation, ToStation, NumberKm, Price, ThroughStations, hour, minute, BusID, CreationDate, UserId)
values ('Kraków G³ówny', 'Czêstochowa Stradom', 33, 23.2, 'Bary', 10, 14, 3, GETDATE(), 5);						
Insert into BusRoute(FromStation, ToStation, NumberKm, Price, ThroughStations, hour, minute, BusID, CreationDate, UserId)
values ('Kraków G³ówny', 'Czêstochowa Stradom', 100, 23.2, 'Bary, Sary', 6, 50, 2, GETDATE(), 5);					
Insert into BusRoute(FromStation, ToStation, NumberKm, Price, ThroughStations, hour, minute, BusID, CreationDate, UserId)
values ('Kraków G³ówny', 'Czêstochowa Stradom', 33, 23.2, 'Bary', 5, 30, 1, GETDATE(), 5);							
Insert into BusRoute(FromStation, ToStation, NumberKm, Price, ThroughStations, hour, minute, BusID, CreationDate, UserId)
values ('Kraków G³ówny', 'Czêstochowa Stradom', 100, 23.2, 'Bary, Sary', 16, 20, 5, GETDATE(), 5);					
Insert into BusRoute(FromStation, ToStation, NumberKm, Price, ThroughStations, hour, minute, BusID, CreationDate, UserId)
values ('Kraków G³ówny', 'Czêstochowa Stradom', 100, 23.2, 'Bary, Sary', 6, 50, 2, GETDATE(), 5);					
Insert into BusRoute(FromStation, ToStation, NumberKm, Price, ThroughStations, hour, minute, BusID, CreationDate, UserId)
values ('Kraków G³ówny', 'Czêstochowa Stradom', 33, 23.2, 'Bary', 6, 55, 5, GETDATE(), 5);							
Insert into BusRoute(FromStation, ToStation, NumberKm, Price, ThroughStations, hour, minute, BusID, CreationDate, UserId)
values ('Kraków G³ówny', 'Czêstochowa Stradom', 100, 23.2, 'Bary, Sary', 6, 30, 3, GETDATE(), 5);

/* Data Discount */
Insert into Discount(DiscountName, PercentageDiscount, CreationDate)
values ('Normalny', 0, GETDATE());								 
Insert into Discount(DiscountName, PercentageDiscount, CreationDate)
values ('Studencki', 50, GETDATE());							 
Insert into Discount(DiscountName, PercentageDiscount, CreationDate)
values ('Szkolny', 40, GETDATE());								 
Insert into Discount(DiscountName, PercentageDiscount, CreationDate)
values ('Senior', 60, GETDATE());								 
Insert into Discount(DiscountName, PercentageDiscount, CreationDate)
values ('Dziecko', 80, GETDATE());

/* Data Tickets  */
Insert into Tickets (TicketNumber, TravelDate, Seat, DiscountId, BusRouteId, UserId, CreationDate, IsBought)
values(1, '2020-08-01', 40, 1, 12, 1, GETDATE(), 0);									
Insert into Tickets (TicketNumber, TravelDate, Seat, DiscountId, BusRouteId, UserId, CreationDate, IsBought)
values(1, '2020-08-01', 22, 2, 12, 1, GETDATE(),0);									
Insert into Tickets (TicketNumber, TravelDate, Seat, DiscountId, BusRouteId, UserId, CreationDate, IsBought)
values(2, '2020-08-01', 24, 1, 12, 3, GETDATE(), 0);									
Insert into Tickets (TicketNumber, TravelDate, Seat, DiscountId, BusRouteId, UserId, CreationDate, IsBought)
values(3, '2020-08-02', 11, 2, 12, 4, GETDATE(), 1);

/* Drop Table */
drop table Tickets;
drop table BusRoute;
drop table Bus;
drop table Users;
drop table Discount;
