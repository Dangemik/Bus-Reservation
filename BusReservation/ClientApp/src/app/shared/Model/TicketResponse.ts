import { BusRoute } from './BusRoute';
import { DiscountKeyValues } from './DiscountKeyValues';
import { User } from './User';

export class TicketResponse {
    ticketNumber: number;
    travelDate: Date;
    seats: number[];
    busRoute: BusRoute;
    user: User;
    selectedDiscountTickets: DiscountKeyValues[];
    CreationDate: Date;
    isBought: boolean;
}