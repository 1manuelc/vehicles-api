import { Vehicle } from '../generated/prisma';

export type VehicleModel = Vehicle;
export type VehicleModelDTO = Omit<Vehicle, 'id'>;
