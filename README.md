# Experimental APIs with TypeScript

## Overview

This is my experimental implementation to create APIs with TypeScript.

## Components

- [NestJS - A progressive Node.js web framework](https://nestjs.com/)
- [TypeORM - Amazing ORM for TypeScript and JavaScript (ES7, ES6, ES5). Supports MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, WebSQL databases. Works in NodeJS, Browser, Ionic, Cordova and Electron platforms.](http://typeorm.io)
- [Jest · 🃏 Delightful JavaScript Testing](https://jestjs.io/)

## How to prepare this environment

```bash
# Prepare
git clone <this repository>
cd experimental-apis-with-typescript/banking
yarn install

# Apply migrations
./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:run
./node_modules/.bin/ts-node ./node_modules/.bin/typeorm schema:sync

# Start the server
yarn run start
```

## ToDo

- [x] Basic implement
- [ ] Test
- [ ] Validate

## Step history

```bash
# Setup the project
sudo npm i -g @nestjs/cli
nest new banking

cd banking
yarn add @nestjs/typeorm typeorm sqlite3
yarn add @nestjs/testing
yarn add nanoid
yarn add --dev moment

# Start the server
yarn run start

# Create controllers, services
nest g controller balances
nest g service balances

nest g controller deposits
nest g service deposits

# Sync schema
./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:run
./node_modules/.bin/ts-node ./node_modules/.bin/typeorm schema:sync

./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:run -c test
./node_modules/.bin/ts-node ./node_modules/.bin/typeorm schema:sync -c test
```
