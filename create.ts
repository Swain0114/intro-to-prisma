import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Swain2',
            email: 'swain.tseng2@quantatw.com',
            Post: {
                // create: {
                //     title: 'Quanta is the best!!!',
                // },
                createMany: {
                    data: [
                        {
                            title: 'Hello world!!!',
                        },
                        {
                            title: 'Hello Swain',
                        },
                    ],
                },
            },
            Profile: {
                create: {
                    bio: 'I like Quanta',
                },
            },
        },
    });
    console.log(user);

    const allUsers = await prisma.user.findMany({
        include: {
            Post: true,
            Profile: true,
        },
    });

    console.dir(allUsers, { depth: null });
}

main()
    .then(async () => {
        console.log('successfully created');
        await prisma.$disconnect();
    })
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
        process.exit();
    });
