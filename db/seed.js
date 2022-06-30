// import pkg from "@prisma/client"
// const { PrismaClient } = pkg
// const prisma = new PrismaClient()
// const { user: User } = prisma

// async function main() {
//     await User.create({
//       data: {
//         name: 'Groupomania',
//         last_name: 'ADMIN',
//         email: 'admin@gmail.com',
//         password: 'Admin2022',
//         confirm_password: 'Admin2022',
//         isAdmin: true,
//       },
//     });
// }

// main()
//     .catch((error) => {
//         console.error(error)
//         process.exit(1)
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })