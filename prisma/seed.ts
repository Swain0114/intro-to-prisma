import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
    {
        name: 'Ray',
        email: 'ray@quantatw.com',
        Post: {
            createMany: {
                data: [
                    {
                        title: 'Hi Michael',
                        content: 'excellent',
                        published: true,
                    },
                    {
                        title: 'Hi George',
                        content: 'excellent',
                    },
                    {
                        title: 'Hi Eric',
                        content: 'excellent',
                        published: true,
                    },
                    {
                        title: 'Hi Mindy',
                        content: 'excellent',
                        published: false,
                    },
                    {
                        title: 'Hi Swain',
                        content: 'excellent',
                        published: true,
                    },
                ],
            },
        },
        Profile: {
            create: {
                bio: 'Aloha',
            },
        },
    },
    {
        name: 'George',
        email: 'george@quantatw.com',
        Post: {
            create: {
                title: 'Hi everyone',
                content: 'excellent',
            },
        },
        Profile: {
            create: {
                bio: 'ha ha ha',
            },
        },
    },
    {
        name: 'Eric',
        email: 'eric@quantatw.com',
        Post: {
            create: {
                title: 'Hi everyone',
                content: 'excellent',
            },
        },
        Profile: {
            create: {
                bio: 'hi hi hi',
            },
        },
    },
    {
        name: 'Swain',
        email: 'swain@quantatw.com',
        Post: {
            createMany: {
                data: [
                    {
                        title: 'Hi Michael',
                        content: 'excellent',
                        published: true,
                    },
                    {
                        title: 'Hi George',
                        content: 'excellent',
                    },
                    {
                        title: 'Hi Eric',
                        content: 'excellent',
                        published: true,
                    },
                    {
                        title: 'Hi Mindy',
                        content: 'excellent',
                        published: false,
                    },
                    {
                        title: 'Hi Swain',
                        content: 'excellent',
                        published: true,
                    },
                ],
            },
        },
        Profile: {
            create: {
                bio: 'good good good',
            },
        },
    },
];

async function main() {
    console.log('Start seeding ...');
    for (const singleUserData of userData) {
        const user = await prisma.user.create({
            data: singleUserData,
        });
        console.log(`Created user with id: ${user.id}`);
    }
    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
