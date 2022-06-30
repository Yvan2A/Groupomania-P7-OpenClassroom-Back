## Groupomania P7

This is the backend for the Groupomania project

### Technologies used

- Node.js, Express, JWT, Multer
- MySQL hosted on PlanetScale
- Prisma for ORM

### How to use

1. `git clone` this repo
2. `npm install`
3. Rename the `.env.development` file into `.env`
4. Populate it with your personal environment variables
5. This repo was tested with an online PlaetScale MySQL database

### How to use Prisma to interact with the DB

The db schema is inside the `schema.prisma`

If you want to change it, you have to run `npx prisma db push`
