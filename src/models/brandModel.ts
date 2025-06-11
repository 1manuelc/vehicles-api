import { Brand } from '../generated/prisma';

export type BrandModel = Brand;
export type BrandModelDTO = Omit<Brand, 'id'>;
