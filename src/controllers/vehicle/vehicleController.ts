import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../errors/ApiError';
import { VehicleService } from '../../services/vehicle/vehicleService';

export class VehicleController {
	private service: VehicleService;

	constructor(serv: VehicleService) {
		this.service = serv;
	}

	async getAllVehicles(req: Request, res: Response, next: NextFunction) {
		try {
			let vehicles = await this.service.getVehicles();

			const { model, year, color, price, mileage, fuelType, brandId } =
				req.query;

			if (model) {
				vehicles = vehicles.filter((vehicle) =>
					vehicle.model.toLowerCase().includes(String(model).toLowerCase())
				);
			}

			if (brandId) {
				vehicles = vehicles.filter(
					(vehicle) => vehicle.brand_id === Number(brandId)
				);
			}

			if (fuelType) {
				vehicles = vehicles.filter((vehicle) =>
					vehicle.fuelType
						.toLowerCase()
						.includes(String(fuelType).toLowerCase())
				);
			}

			if (color) {
				vehicles = vehicles.filter((vehicle) =>
					vehicle.color.toLowerCase().includes(String(color).toLowerCase())
				);
			}

			if (mileage) {
				vehicles = vehicles.filter(
					(vehicle) => vehicle.mileage < Number(mileage) // retorna veículos com quilometragem menor que a consultada
				);
			}

			if (price) {
				vehicles = vehicles.filter((vehicle) => vehicle.price < Number(price));
			}

			if (year) {
				vehicles = vehicles.filter((vehicle) => vehicle.year === Number(year));
			}

			return res.status(200).json({
				success: true,
				message: `${vehicles.length} vehicle${
					vehicles.length > 1 ? 's' : ''
				} found`,
				data: vehicles.sort((a, b) => a.id - b.id),
			});
		} catch (err) {
			next(err);
		}
	}

	async getVehicleById(req: Request, res: Response, next: NextFunction) {
		try {
			const vehicle = await this.service.getVehicleById(Number(req.params.id));

			if (!vehicle) {
				throw new ApiError(404, `vehicle with id ${req.params.id} not found`);
			}

			return res.status(200).json({
				success: true,
				message: `vehicle with id ${req.params.id} found`,
				data: vehicle,
			});
		} catch (err) {
			next(err);
		}
	}

	async createVehicle(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.body) {
				throw new ApiError(404, 'invalid vehicle information provided');
			}

			const vehicle = await this.service.createVehicle({ ...req.body });
			if (!vehicle) {
				throw new ApiError(500, 'there was an error creating the vehicle');
			}

			return res.status(200).send({
				success: true,
				message: 'vehicle created successfully',
				data: vehicle,
			});
		} catch (err) {
			next(err);
		}
	}

	async updateVehicleById(req: Request, res: Response, next: NextFunction) {
		try {
			const updated = await this.service.patchVehicleById(
				Number(req.params.id),
				{ ...req.body }
			);

			if (!updated) {
				throw new ApiError(404, 'there was an error updating the vehicle');
			}

			return res.status(200).json({
				success: true,
				message: `vehicle with id ${req.params.id} updated`,
				data: updated,
			});
		} catch (err) {
			next(err);
		}
	}

	async deleteVehicleById(req: Request, res: Response, next: NextFunction) {
		try {
			const deleted = await this.service.deleteVehicleById(
				Number(req.params.id)
			);

			if (!deleted) {
				throw new ApiError(404, 'there was an error deleting the vehicle');
			}

			return res.status(200).json({
				success: true,
				message: `vehicle with id ${req.params.id} deleted`,
				data: deleted,
			});
		} catch (err) {
			next(err);
		}
	}
}
