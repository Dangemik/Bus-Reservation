import { BusRoute } from './BusRoute';
import { User } from './User';
import { DiscountKeyValues } from './DiscountKeyValues';

export class TicketDTO {
    ticketNumber: number;
    travelDate: Date;
    seats: number[];
    busRoute: BusRoute;
    user: User;
    selectedDiscountTickets: DiscountKeyValues[];
    isBought: boolean;

    constructor(travelDate: Date, seats: number[], busRoute: BusRoute, user: User, selectedDiscountTickets: DiscountKeyValues[], isBought: boolean = false) {
        this.travelDate = travelDate;
        this.seats = seats;
        this.busRoute = busRoute;
        this.user = user;
        this.selectedDiscountTickets = selectedDiscountTickets;
        this.isBought = isBought;
    }

}

