# nestjs-hateoas-hal

## What?
This is a NestJS demo app for user authentication.
The main part is that it has a [NestJS library](https://github.com/Juanelorganelo/nestjs-hateoas-hal/blob/master/src/core/hateoas/HateoasModule.ts) for using JSON HAL as the API's main content type with a declarative syntax.

It consists of NestJS specific modules (interceptors and whatnot) as well as a platform-agnostic API for declaring linked data (so that it can be used with other hypermedia formats).

## Quick start
Clone the repo.
```shell
git clone git@github.com:Juanelorganelo/e-learning-api.git
```
Install dependencies.
```shell
yarn install
```
Start the API
```shell
docker-compose up
```
