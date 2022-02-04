<p align="center">
  <img src="https://avatars.githubusercontent.com/u/68288528?s=200&v=4" alt="Loomi" width="80" />
</p>

<h1 align="center">Node Leap</h1>

<p align="center">
  Node Leap is a node boilerplate that follows best practicles of software design and agile
</p>

### Userful links

## Requeriments
- Docker and Docker compose

## 💎 Designs and methodologies

- Factory
- Adapter
- Composite
- Decorator
- Dependency Injection
- TDD
- Clean Code
- Clean Archictecture

## 🎒 Stack

- Express
- Prisma
- Jest

## 💻 Running locally

### Setup

**`(nano | vi | vim| nvim ) .env`**
> Create .env follow the .env.example

**`npm ci`**
> Install js dependencies
### Runing Local
**`npm run start:dev`**
> Access http://localhost:{ENV.PORT} to see the swagger documentation

### Runing with Docker
**`sudo docker-compose -f docker-compose.dev.yml build && sudo docker-compose -f docker-compose.dev.yml up -d && sudo docker-compose -f docker-compose.dev.yml logs -f`**
> Run the docker to up the adminer, api and databases

> Access http://localhost:{ENV.PORT} to see the swagger documentation

### Generate CRUD for basic Entity
**`npm run plop`**
> To select plop script to run

> Select the first option and type the Entity name (ex: TesteRatinho, Batata)

**`npm run prisma:migration 'Create {name of Entity}'`**
> To create a migration and update the prisma client

> Add your entity paths to `/src/infra/swagger/index.ts`

## 💻 Testing

### UNIT

> Don't need of the project run to test!

**`npm run test:unit`**
> To run tests in time of development with hot-reload

**`npm run test:ci`**
> To run all tests of the project and generate coverage

## ☁️ Deploying

`TODO: describe cloud stack and deploy procedures`

#
Made with ❤️ by **Loomi**
