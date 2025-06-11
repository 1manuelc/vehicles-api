import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function seedBrands() {
	await prisma.brand.createMany({
		data: [
			{
				name: 'Ferrari',
				country: 'Italy',
				foundedAt: 1939,
				logoUrl:
					'https://upload.wikimedia.org/wikipedia/en/9/9b/Scuderia_Ferrari_Logo.png',
				description:
					'Legendary Italian sports car manufacturer with a strong F1 heritage.',
			},
			{
				name: 'Mercedes-Benz',
				country: 'Germany',
				foundedAt: 1926,
				logoUrl:
					'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg',
				description:
					'Luxury car brand with dominant presence in F1 through Mercedes-AMG Petronas.',
			},
			{
				name: 'McLaren',
				country: 'United Kingdom',
				foundedAt: 1963,
				logoUrl:
					'https://upload.wikimedia.org/wikipedia/en/b/bf/McLaren_Racing_logo.png',
				description:
					'British automotive and F1 powerhouse known for innovation.',
			},
			{
				name: 'Red Bull Racing',
				country: 'Austria',
				foundedAt: 2005,
				logoUrl:
					'https://upload.wikimedia.org/wikipedia/en/thumb/5/59/Red_Bull_Racing_logo.svg/1920px-Red_Bull_Racing_logo.svg.png',
				description: 'High-performing F1 team owned by Red Bull GmbH.',
			},
			{
				name: 'Toyota',
				country: 'Japan',
				foundedAt: 1937,
				logoUrl:
					'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_logo.png',
				description: 'Known for reliable vehicles and past F1 involvement.',
			},
			{
				name: 'Ford',
				country: 'USA',
				foundedAt: 1903,
				logoUrl:
					'https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg',
				description:
					'Pioneered automobile mass production. Returning to F1 with Red Bull in 2026.',
			},
			{
				name: 'BMW',
				country: 'Germany',
				foundedAt: 1916,
				logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
				description:
					'Luxury and performance, with a history in motorsport and F1.',
			},
		],
	});

	console.log('✅ Brands seeded');
}

async function seedVehicles() {
	const brands = await prisma.brand.findMany();

	const brandMap = new Map(brands.map((b) => [b.name, b.id]));

	await prisma.vehicle.createMany({
		data: [
			{
				model: 'Ferrari SF90 Stradale',
				year: 2023,
				color: 'Red',
				price: 550000,
				mileage: 1200,
				fuelType: 'HYBRID',
				brand_id: brandMap.get('Ferrari')!,
			},
			{
				model: 'Mercedes-AMG ONE',
				year: 2023,
				color: 'Silver',
				price: 2700000,
				mileage: 800,
				fuelType: 'HYBRID',
				brand_id: brandMap.get('Mercedes-Benz')!,
			},
			{
				model: 'McLaren Artura',
				year: 2023,
				color: 'Orange',
				price: 240000,
				mileage: 1500,
				fuelType: 'HYBRID',
				brand_id: brandMap.get('McLaren')!,
			},
			{
				model: 'RB20 Prototype',
				year: 2024,
				color: 'Matte Blue',
				price: 999999,
				mileage: 100,
				fuelType: 'HYBRID',
				brand_id: brandMap.get('Red Bull Racing')!,
			},
			{
				model: 'Toyota GR Supra',
				year: 2022,
				color: 'White',
				price: 55000,
				mileage: 5000,
				fuelType: 'GASOLINE',
				brand_id: brandMap.get('Toyota')!,
			},
			{
				model: 'Ford Mustang Mach-E',
				year: 2022,
				color: 'Blue',
				price: 62000,
				mileage: 2500,
				fuelType: 'ELECTRIC',
				brand_id: brandMap.get('Ford')!,
			},
			{
				model: 'BMW i8',
				year: 2020,
				color: 'Black',
				price: 140000,
				mileage: 7000,
				fuelType: 'HYBRID',
				brand_id: brandMap.get('BMW')!,
			},
		],
	});

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
