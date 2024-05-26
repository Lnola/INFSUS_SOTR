# SOTR

## Running the project

### Environment variables

Set the matching env variables by creating a file called `.env` in the `./server` folder.
You can follow the example set in the `.env.example` file.
The initial setup is

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=infsus_sotr
DB_USER=infsus_sotr
DB_PASSWORD=infsus_sotr

```

but you can change that depending on your connection.

### Requirements

- Node ~v20
- Docker (optional)

With `fnm` or `nvm` Node versions will be changed automatically.

Docker is used to run the postgresql database. It can be replaced with a local database which needs to be created in that case. This guide will focus only on the version with docker.

### Detailed explanatin

Clone this repository and navigate to the root.

```sh
$ git clone git@github.com:Lnola/INFSUS_SOTR.git # Clone over SSH
$ git clone https://github.com/Lnola/INFSUS_SOTR.git # Clone over HTTPS

$ cd INFSUS-SOTR
```

If you are a developer install the root dependencies. If not skip this part.

```sh
npm i
```

### Simple start without explanations

```sh
$ cd server && npm i
$ npm run start:infrastructure # if that fails try $ docker compose up -d
$ npm run db:fresh
$ npm run start:dev

$ cd ../client && npm i
$ npm run dev
```

### To run the server

First cd to the server and install the dependencies

```sh
$ cd server
$ npm i
```

Create and start the database

```sh
$ npm run start:infrastructure
```

Run migrations and seed

```sh
$ npm run db:migration:up
$ npm run db:seed

# Or to do both at the same time run
$ npm run db:fresh
```

Start the server

```sh
$ npm run start:dev
```

### To run the client

First cd to the client and install the dependencies

```sh
$ cd client
$ npm i
```

Start the client

```sh
$ npm run dev
```

### To run the tests

```sh
$ cd server
$ npm run test
```
