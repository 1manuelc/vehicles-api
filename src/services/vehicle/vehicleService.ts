import { VehicleModel, VehicleModelDTO } from '../../models/vehicleModel';
import { VehicleRepository } from '../../repository/vehicle/vehicleRepository';

export class VehicleService {
	private repository: VehicleRepository;

	constructor(repo: VehicleRepository) {
		this.repository = repo;
	}

	async getVehicles(): Promise<VehicleModel[] | []> {
		return this.repository.findAll();
	}

	async getVehicleById(id: number): Promise<VehicleModel | null> {
		return this.repository.findById(id);
	}

	async createVehicle(data: VehicleModelDTO): Promise<VehicleModel> {
		return this.repository.create(data);
	}

	async patchVehicleById(
		id: number,
		data: VehicleModelDTO
	): Promise<VehicleModel> {
		return this.repository.patchById(id, data);
	}

	async deleteVehicleById(id: number): Promise<VehicleModel | null> {
		return this.repository.deleteById(id);
	}
}
