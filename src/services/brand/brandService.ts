import { Brand } from '../../generated/prisma';
import { BrandRepository } from '../../repository/brand/brandRepository';

export class BrandService {
	private repository: BrandRepository;

	constructor(repo: BrandRepository) {
		this.repository = repo;
	}

	async getBrands(): Promise<Brand[] | []> {
		return this.repository.findAll();
	}

	async getBrandById(id: number): Promise<Brand | null> {
		return this.repository.findById(id);
	}

	async createBrand(data: Omit<Brand, 'id'>): Promise<Brand> {
		return this.repository.create(data);
	}

	async patchBrandById(id: number, data: Omit<Brand, 'id'>): Promise<Brand> {
		return this.repository.patchById(id, data);
	}

	async deleteBrandById(id: number): Promise<Brand | null> {
		return this.repository.deleteById(id);
	}
}
