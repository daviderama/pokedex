# Pokedex REST API

## Description

This REST API was built by using [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## What I would do different for a production API

First of all I would check the real needs for using the NestJS framwork. For the sake of this take home task and time, I decided to make usage of the framwork which comes with an exhaustive boilerplate which came really handy for this use case. For a real case scenario tho, I might not need all the pieces that comes along with the framework. 

I would probably try to follow more the Single-responsiblity principle by creating more modules based on the different functionalities of the API.

I would definetely extend the test coverage and consider more edge cases, in both unit and end-to-end tests.

Finally, by getting to know more the real life purpose and the business domain, I would design my code following the Domain-driven design (DDD) approach.


