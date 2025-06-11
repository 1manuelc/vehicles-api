import { ApiError } from '../../errors/ApiError';
import { BrandService } from '../../services/brand/brandService';
import { NextFunction, Request, Response } from 'express';

export class BrandController {
	private service: BrandService;

	constructor(serv: BrandService) {
		this.service = serv;
	}

	async getAllBrands(req: Request, res: Response, next: NextFunction) {
		try {
			let brands = await this.service.getBrands();

			const { name, country, foundedAt } = req.query;

			if (name) {
				brands = brands.filter((brand) =>
					brand.name.toLowerCase().includes(String(name).toLowerCase())
				);
			}

			if (country) {
				brands = brands.filter((brand) =>
					brand.country.toLowerCase().includes(String(country).toLowerCase())
				);
			}

			if (foundedAt) {
				brands = brands.filter(
					(brand) => brand.foundedAt === Number(foundedAt)
				);
			}

			return res.status(200).json({
				success: true,
				// formata mensagem com plural ou singular para brands
				message: `${brands.length} brand${brands.length > 1 ? 's' : ''} found`,
				// formata saída para query param de filtragem aparecer em message
				data: brands.sort((a, b) => a.id - b.id),
				// ordena por id crescente,
			});
		} catch (err) {
			next(err);
		}
	}

	async getBrandById(req: Request, res: Response, next: NextFunction) {
		try {
			const brand = await this.service.getBrandById(Number(req.params.id));

			if (!brand) {
				throw new ApiError(404, `brand with id ${req.params.id} not found`);
			}

			return res.status(200).json({
				success: true,
				message: `brand with id ${req.params.id} found`,
				data: brand,
			});
		} catch (err) {
			next(err);
		}
	}

	async createBrand(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.body) {
				throw new ApiError(404, 'invalid brand information provided');
			}

			const brand = await this.service.createBrand({ ...req.body });
			if (!brand) {
				throw new ApiError(500, 'there was an error creating the brand');
			}

			return res.status(200).send({
				success: true,
				message: 'brand created successfully',
				data: brand,
			});
		} catch (err) {
			next(err);
		}
	}

	async updateBrandById(req: Request, res: Response, next: NextFunction) {
		try {
			const updated = await this.service.patchBrandById(Number(req.params.id), {
				...req.body,
			});

			if (!updated) {
				throw new ApiError(404, 'there was an error updating the brand');
			}

			return res.status(200).json({
				success: true,
				message: `brand with id ${req.params.id} updated`,
				data: updated,
			});
		} catch (err) {
			next(err);
		}
	}

	async deleteBrandById(req: Request, res: Response, next: NextFunction) {
		try {
			const deleted = await this.service.deleteBrandById(Number(req.params.id));

			if (!deleted) {
				throw new ApiError(404, 'there was an error deleting the brand');
			}

			return res.status(200).json({
				success: true,
				message: `brand with id ${req.params.id} deleted`,
				data: deleted,
			});
		} catch (err) {
			next(err);
		}
	}
}
