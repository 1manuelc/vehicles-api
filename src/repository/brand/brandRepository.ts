import { PrismaClient } from '../../generated/prisma';
import { BrandModel, BrandModelDTO } from '../../models/brandModel';

export class BrandRepository {
	private prisma: PrismaClient;

	constructor(client: PrismaClient) {
		this.prisma = client;
	}

	async findAll(): Promise<BrandModel[] | []> {
		return await this.prisma.brand.findMany();
	}

	async findById(id: number): Promise<BrandModel | null> {
		return await this.prisma.brand.findUnique({ where: { id } });
	}

	async create(data: BrandModelDTO): Promise<BrandModel> {
		const existingBrand = await this.prisma.brand.findUnique({
			where: { name: data.name },
		});

		if (existingBrand) {
			throw new Error(`Brand with model "${data.name}" already exists.`);
		}

		return await this.prisma.brand.create({
			data: {
				name: data.name,
			},
		});
	}

	async patchById(id: number, data: BrandModelDTO): Promise<BrandModel> {
		return await this.prisma.brand.update({
			where: { id },
			data: { ...data },
		});
	}

	async deleteById(id: number): Promise<BrandModel | null> {
		return await this.prisma.brand.delete({
			where: { id },
		});
	}
}
