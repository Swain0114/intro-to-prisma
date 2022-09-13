import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const allUsersBefore = await prisma.user.findMany({
        include: {
            Post: true,
            Profile: true,
        },
    });

    console.log('before delete------------');
    console.dir(allUsersBefore, { depth: null });

    const deleteUser = prisma.user.delete({
        where: {
            email: 'swain.tseng@quantatw.com',
        },
    });
    const deletePosts = prisma.post.delete({
        where: {
            id: 1,
        },
    });
    const deleteProfile = prisma.profile.delete({
        where: {
            userId: 2,
        },
    });

    const transaction = await prisma.$transaction([deletePosts, deleteProfile, deleteUser]);

    console.log('transaction result:>> ', transaction);

    const allUsersAfter = await prisma.user.findMany({
        include: {
            Post: true,
            Profile: true,
        },
    });

    console.log('after delete------------');
    console.dir(allUsersAfter, { depth: null });
}

main()
    .then(async () => {
        console.log('successfully deleted');
        await prisma.$disconnect();
    })
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
        process.exit();
    });
