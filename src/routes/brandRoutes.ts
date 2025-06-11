import { Router } from 'express';
import { BrandController } from '../controllers/brand/brandController';
import { BrandService } from '../services/brand/brandService';
import { BrandRepository } from '../repository/brand/brandRepository';
import prismaClient from '../prisma/client';

export const brandRouter = Router();

const repository = new BrandRepository(prismaClient);
const service = new BrandService(repository);
const controller = new BrandController(service);

brandRouter.get('/', (req, res, next) => {
	controller.getAllBrands(req, res, next);
});
brandRouter.post('/', (req, res, next) => {
	controller.createBrand(req, res, next);
});
brandRouter.get('/:id', (req, res, next) => {
	controller.getBrandById(req, res, next);
});
brandRouter.patch('/:id', (req, res, next) => {
	controller.updateBrandById(req, res, next);
});
brandRouter.delete('/:id', (req, res, next) => {
	controller.deleteBrandById(req, res, next);
});
