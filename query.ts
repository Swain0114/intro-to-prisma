import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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
        console.log('successfully queried');
        await prisma.$disconnect();
    })
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
        process.exit();
    });
