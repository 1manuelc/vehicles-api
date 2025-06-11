import { PrismaClient } from '../../generated/prisma';
import { VehicleModel, VehicleModelDTO } from '../../models/vehicleModel';

export class VehicleRepository {
	private prisma: PrismaClient;

	constructor(client: PrismaClient) {
		this.prisma = client;
	}

	async findAll(): Promise<VehicleModel[] | []> {
		return await this.prisma.vehicle.findMany();
	}

	async findById(id: number): Promise<VehicleModel | null> {
		return await this.prisma.vehicle.findUnique({ where: { id } });
	}

	async create(data: VehicleModelDTO): Promise<VehicleModel> {
		const existingVehicle = await this.prisma.vehicle.findUnique({
			where: { model: data.model },
		});

		if (existingVehicle) {
			throw new Error(`Vehicle with model "${data.model}" already exists.`);
		}

		return await this.prisma.vehicle.create({ data });
	}

	async patchById(id: number, data: VehicleModelDTO): Promise<VehicleModel> {
		return await this.prisma.vehicle.update({
			where: { id },
			data: { ...data },
		});
	}

	async deleteById(id: number): Promise<VehicleModel | null> {
		return await this.prisma.vehicle.delete({
			where: { id },
		});
	}
}
