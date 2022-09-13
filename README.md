# intro-to-prisma

## Branches

-   main
-   prisma-init
-   define-model

## Steps

1. Clone main branch
2. Exec `npm install`
3. `npx prisma init` ---> this command would set postgreSQL as datasource provider
4. [Register ElephantSQL](https://customer.elephantsql.com/login) which is a postgreSQL cloud service
5. Define models

###### File `prisma/schema.prisma`

```
model Post {
  id        Int      @id @default(autoincrement())
  title     String   @db.VarChar(255)
  createdAt DateTime @default(now()) @db.Timestamp(6)
  content   String?
  published Boolean  @default(false)
  authorId  Int
  User      User     @relation(fields: [authorId], references: [id])
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  userId Int     @unique
  User   User    @relation(fields: [userId], references: [id])
}

model User {
  id      Int      @id @default(autoincrement())
  name    String?  @db.VarChar(255)
  email   String   @unique @db.VarChar(255)
  Post    Post[]
  Profile Profile?
}
```

5. Syncoronize your prisma schema ---> `npx prisma db push`
6. Check your [postgreSQL database](https://customer.elephantsql.com/login) it would show three tables which are **Post, Profile, User**
7. Generate prisma client ---> `npx prisma generate`
   ![](https://i.imgur.com/mtBMguK.png)
8. Check node_modules/.prisma/client/index.d.ts and you would see three type(**Post, Profile, User**) that are declared
9. Create and select nested data

###### File `./create.ts`

```javascript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Swain1',
            email: 'swain.tseng1@quantatw.com',
            Post: {
                create: {
                    title: 'Quanta is the best!!!',
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
```

10. Update and select

###### File `./update.ts`

```javascript
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
```
