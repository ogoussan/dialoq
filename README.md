
# Dialoq

Dialoq enables you to learn and practice language with the power of Generative AI.

<img width="948" alt="image" src="https://github.com/ogoussan/linguai/assets/75047088/47f853cf-0e15-480e-a11f-f713a3e727d1">


## Requirements

- [Git](https://git-scm.com/) - Version 2 or higher
- [Node.js](https://nodejs.org/) - Version 16 or higher
- [Heroku](https://data.heroku.com/datastores/e028d2f5-f885-47bb-855a-7ff2cc64b4d2) - Database Access

## Setup

1. Clone the repository and change directory

   ```bash
   git clone https://github.com/MoneyTrees/linguai.git
   ```

   ```bash
   cd linguai
   ```

2. Install dependencies
   ```bash
   npm install
   ```
3. Setup [Environment Variables](#environment-variables)
4. Start the local development server

   ```bash
   # starts frontend & backend concurrently
   npm run dev
   ```

   ```bash
   # starts one of frontend or backend
   npm start backend
   npm start frontend
   ```

5. Start the database container

   ```bash
     npm run db
   ```

6. Seed the database (optional)

   ```bash
     npm run db:seed
   ```

7. Open the browser and open
   1. http://localhost:4200 for frontend
   2. http://localhost:3000/api for backend

### Environment Variables

create a `.env` in the root of the project with the following content. The values wrapped in curly brackets you need to ask one of the maintainers of the project.

```bash
NODE_ENV='development'
PORT='3000'
NX_API_URL='http://localhost:3000'
NX_APP_URL='http://localhost:4200'
NX_DB_HOST='{{DATABSE_HOST}}'
NX_DB_PASSWORD='{{DATABSE_PASSWORD}}'
NX_DB_NAME='{{DATABASE_NAME}}'
NX_DB_USER='{{DATABASE_USER}}'
NX_DB_PORT='{{DATABASE_PORT}}'
NX_DB_SYNC='false'
NX_GOOGLE_CLIENT_ID='{{GOOGLE_CLIENT_ID}}'
NX_GOOGLE_CLIENT_KEY='{{GOOGLE_CLIENT_KEY}}'
```

## Database Migrations

Database related changes should always be handled through migrations

### Create Migration

When you make database related changes (like new columns, relations, etc) you have to generate a migration file:

```bash
npm run migrations:generate NAME
```

this will create a new migration file in `migrations/*.js`. Here you have to select the `*.js` file and check the query operations.

> :warning: you have to add this line over the `require('typeorm')` statement:
>
> ```ts
> /* eslint-disable @typescript-eslint/no-unused-vars */
> ```
>
> otherwise the `pre-commit` hook will fail

all queries inside the `up()` function will be executed when [running](#run-migration) the migration, the `down()` for [reverting](#revert-migrations) migrations.

You might have to adjust the queries, since typeorm will not generate every required step. Check previous migrations to see, what you have to do.

### Run Migration

To update your local Database, you only have to run

```bash
npm run migrations:run
```

this will run every migration in the `migrations/` folder

### Revert Migrations

You might want to revert a migration you did, for that just simply call

```bash
npm run migrations:revert
```

this will revert the latest migrations defined in the `up()` function. If you want to revert multiple migrations, you have to repeat this step until you have your desired db state.
