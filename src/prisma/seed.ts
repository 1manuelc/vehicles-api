import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function seedBrands() {
	await prisma.brand.createMany({
		data: [
			{
				name: 'Toyota',
				country: 'Japan',
				foundedAt: 1937,
				logoUrl:
					'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_logo.png',
				description:
					'Toyota is a Japanese automotive manufacturer known for reliability.',
			},
			{
				name: 'Ford',
				country: 'USA',
				foundedAt: 1903,
				logoUrl:
					'https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg',
				description: 'Ford pioneered mass production of automobiles.',
			},
			{
				name: 'BMW',
				country: 'Germany',
				foundedAt: 1916,
				logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
				description:
					'BMW is a German luxury vehicle and motorcycle manufacturer.',
			},
		],
	});
	console.log('✅ Seed: Brands created');
}

async function main() {
	try {
		await seedBrands();
		console.log('✅ Seeding successfull!');
	} catch (err) {
		console.error('❌ Seeding error:', err);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

main();
