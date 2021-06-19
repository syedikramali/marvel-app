# Marvel Coding Challenge

APIs to get all marvel chacracters using redis cache to improve the performance.

## APIs - Feature

- `/characters` returns all the Marvel character ids in a Array
- `/characters/{id}` returns id, name and description of a specific character.

## OpenAPI Spec

- Please get it from: `openAPI/marvel.yml`

Notes:

> Marvel offical API's only return 100 records only for each request
> In this Application we used Redis cache to improve performance and to reduce latency in subsequent calls

## Tech Stack

- node.js - <http://nodejs.org> : JavaScript runtime environment
- expressJS - <https://expressjs.com/> : Web application framework for Node.js
- redis cache - <https://redis.io/documentation> : open source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker.
- chaijs - <https://www.chaijs.com/> : Chai is a BDD / TDD assertion library for [node](http://nodejs.org) and the browser that can be delightfully paired with any javascript testing framework.
- chaijs http - <https://www.chaijs.com/> : For http calls
- mochajs - <https://mochajs.org/> : Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun
- (option) Redis-Commander http://joeferner.github.io/redis-commander/ Redis-Commander is a node.js web application used to view, edit, and manage a Redis Database

## Dev Requirements

- `node` in latest version. Make sure your local is installed NodeJS
- `npm` in latest version. Make sure your local installed npm
- `redis setup` <https://github.com/microsoftarchive/redis/releases/tag/win-3.0.504> While development used windows OS, download MSI file from given link and refer same for any issues. For other OS use this link <https://redis.io/download>
- Make sure you have correct variables on `.env`: `APP_BASE_URL`, `PORT`, `PUBLIC_KEY`, `PRIVATE_KEY`
- (option) Redis-Commander http://joeferner.github.io/redis-commander/ Redis-Commander is a node.js web application used to view, edit, and manage a Redis Database

here is the `.env` content:

```sh
APP_BASE_URL=MARVEL_API_URL
PORT=YOUR_SERVER_PORT

PUBLIC_KEY=MAVEL_API_PUIBLIC_KEY
PRIVATE_KEY=MARVEL_API_PRIVATE_KEY
```

## Installation

Install the dependencies and devDependencies and start the server.

```sh
cd marvel-app
npm install
npm start
```

For running the tests.

```sh
npm run test
```
