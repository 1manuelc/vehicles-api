import { BrandModel, BrandModelDTO } from '../../models/brandModel';
import { BrandRepository } from '../../repository/brand/brandRepository';

export class BrandService {
	private repository: BrandRepository;

	constructor(repo: BrandRepository) {
		this.repository = repo;
	}

	async getBrands(): Promise<BrandModel[] | []> {
		return this.repository.findAll();
	}

	async getBrandById(id: number): Promise<BrandModel | null> {
		return this.repository.findById(id);
	}

	async createBrand(data: BrandModelDTO): Promise<BrandModel> {
		return this.repository.create(data);
	}

	async patchBrandById(id: number, data: BrandModelDTO): Promise<BrandModel> {
		return this.repository.patchById(id, data);
	}

	async deleteBrandById(id: number): Promise<BrandModel | null> {
		return this.repository.deleteById(id);
	}

	async getVehiclesByBrandId(id: number) {
	return this.repository.findVehiclesByBrandId(id);
}

}
