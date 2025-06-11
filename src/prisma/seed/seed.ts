import { FuelType, PrismaClient } from '../../generated/prisma';
import brandsData from './data/brands.json';
import vehiclesData from './data/vehicles.json';

const prisma = new PrismaClient();

async function seedBrands() {
	await prisma.brand.createMany({ data: brandsData });
	console.log('✅ Brands seeded');
}

async function seedVehicles() {
	const brands = await prisma.brand.findMany();
	const brandMap = new Map(brands.map((b) => [b.name, b.id]));

	const vehiclesToCreate = vehiclesData.map((vehicle) => ({
		model: vehicle.model,
		year: vehicle.year,
		color: vehicle.color,
		price: vehicle.price,
		mileage: vehicle.mileage,
		fuelType: FuelType[vehicle.fuelType as keyof typeof FuelType],
		brand_id: brandMap.get(vehicle.brandName)!,
	}));

	await prisma.vehicle.createMany({ data: vehiclesToCreate });
	console.log('✅ Vehicles seeded');
}

async function main() {
	try {
		await seedBrands();
		await seedVehicles();
		console.log('✅ Seeding completed!');
	} catch (err) {
		console.error('❌ Seeding error:', err);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

main();
