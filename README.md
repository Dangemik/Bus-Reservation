# BusReservation
A fully functional system for booking and buying tickets for bus transport. To create the system ASP.NET Core and Angular technologies were used.
# Application Process
Home page view
![alt text](https://github.com/Dangemik/Bus-Reservation/blob/main/ImagesForReadme/home.png?raw=true)
After the page loads, the user can search for a bus connection from stop to stop by typing the connection from the keyboard or by choosing from a drop-down list that appears when clicking on a cell in the form or after starting to type. Then the user selects the date of the ride, which cannot be earlier than today, i.e. he cannot select yesterday. 
![alt text](https://github.com/Dangemik/Bus-Reservation/blob/main/ImagesForReadme/searchRoute.png?raw=true)
After clicking the "search" button, a new dialog box is displayed with the next steps of buying or booking a bus ticket. Additionally in the upper part of the window there are three tabs which summarize what the user has completed during the booking process. The first step is to select a bus connection from the displayed list of bus connections that meet the criteria selected by the user. After selecting the connection you are interested in, click the "Select" button, which selects the connection and inserts information about this connection to the first tab 
![alt text](https://github.com/Dangemik/Bus-Reservation/blob/main/ImagesForReadme/selectRoute.png?raw=true)
After selecting a connection, the user is asked to fill in personal information such as name, surname, phone number and email to which the bus ticket will be sent. After completing the form and clicking the "Next" button, the information is inserted into the second tab.
![alt text](https://github.com/Dangemik/Bus-Reservation/blob/main/ImagesForReadme/FillInformation.png?raw=true)
When you move on, you see all the free places marked in green and all the occupied places marked in red, which you cannot click on or reserve. The user clicks on the free seats he/she is interested in, if the seat turns blue it means that the seat has been selected. After the selection of interesting places you can see the change in the third tab, where you can see the selected places with the discounts to choose. The user can select the number of discounts for a given type of discount. After selecting the quantity, the user selects the discount type. If the user has more than one discount type he/she clicks the plus sign "add discount" and as above selects the quantity and discount type. A maximum of 4 types of discount can be added. After the selection of seats and discounts the user chooses to book or buy a ticket.
![alt text](https://github.com/Dangemik/Bus-Reservation/blob/main/ImagesForReadme/SelectSeatsAndDiscounts.png?raw=true)
![alt text](https://github.com/Dangemik/Bus-Reservation/blob/main/ImagesForReadme/discounts.png?raw=true)
After buying or booking a ticket, a window is displayed summarizing all the information such as personal data, journey data, selected seats and discounts, status whether the seats are "Paid" or "Reserved". The user has the option "Download Ticket" which allows him to download and print the ticket he needs to show to the driver. The ticket is also sent to the e-mail address given by the user.
![alt text](https://github.com/Dangemik/Bus-Reservation/blob/main/ImagesForReadme/confirmation.png?raw=true)
![alt text](https://github.com/Dangemik/Bus-Reservation/blob/main/ImagesForReadme/ticketInPdf.png?raw=true)

# Application management
After the page loads, the administrator can go to the administration panel by clicking the "Login" button in the upper right corner. After clicking the button, the login form appears, the system asks for the login, password and clicking the "Login" button. If the login and password are correct, the administrator is logged in and two new links "Admin Panel" and "Logout" appear in the menu along with "Welcome Admin" which indicates a valid login. The administrator clicks on the "Admin Panel" link, which takes him to the administration panel, where there are five tabs for managing the entire system.
![alt text](https://github.com/Dangemik/Bus-Reservation/blob/main/ImagesForReadme/loginToPanel.png?raw=true)
The first card is for managing buses, the second card is for managing bus routes, the third card is for managing tickets, the fourth and fifth cards are for managing users and discounts. The cards have an "Add" button that adds another row to the list when the form is completed. Each row has an "Edit" and "Delete" column to update and delete each row 
![alt text](https://github.com/Dangemik/Bus-Reservation/blob/main/ImagesForReadme/management.png?raw=true)
![alt text](https://github.com/Dangemik/Bus-Reservation/blob/main/ImagesForReadme/managementRoute.png?raw=true)
