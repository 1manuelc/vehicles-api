import { Router } from 'express';
import { VehicleController } from '../controllers/vehicle/vehicleController';
import prismaClient from '../prisma/client';
import { VehicleRepository } from '../repository/vehicle/vehicleRepository';
import { VehicleService } from '../services/vehicle/vehicleService';

export const vehicleRouter = Router();

const repository = new VehicleRepository(prismaClient);
const service = new VehicleService(repository);
const controller = new VehicleController(service);

vehicleRouter.get('/', (req, res, next) => {
	controller.getAllVehicles(req, res, next);
});
vehicleRouter.post('/', (req, res, next) => {
	controller.createVehicle(req, res, next);
});
vehicleRouter.get('/:id', (req, res, next) => {
	controller.getVehicleById(req, res, next);
});
vehicleRouter.patch('/:id', (req, res, next) => {
	controller.updateVehicleById(req, res, next);
});
vehicleRouter.delete('/:id', (req, res, next) => {
	controller.deleteVehicleById(req, res, next);
});
