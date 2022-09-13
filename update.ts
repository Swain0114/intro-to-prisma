import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const post = await prisma.post.update({
        where: { id: 1 },
        data: { published: true },
    });

    console.log('post :>> ', post);

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
