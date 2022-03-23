import { Bus } from './Bus';
import { User } from './User';

export class BusRoute {
    busRouteId: number;
    fromStation: string;
    toStation: string;
    numberKm: number;
    price: number;
    throughStations: string;
    hour: number;
    minute: number;
    bus: Bus;
    creationDate: Date;
    deletionDate: Date;
    user: User;
}