import { BusRoute } from './BusRoute';
import { Discount } from './Discount';
import { User } from './User';

export class Ticket {
    ticketId: number;
    ticketNumber: number;
    travelDate: Date;
    seat: number;
    discount: Discount;
    busRoute: BusRoute;
    user: User;
    creationDate: Date;
    deletionDate: Date;
}