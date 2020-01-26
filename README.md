# Apollo Sequelize Typescript 
[![CircleCI](https://circleci.com/gh/dooboolab/ts-apollo-sequelize.svg?style=shield)](https://circleci.com/gh/dooboolab/ts-apollo-sequelize)
[![codecov](https://codecov.io/gh/dooboolab/ts-apollo-sequelize/branch/master/graph/badge.svg)](https://codecov.io/gh/dooboolab/ts-apollo-sequelize)

> Specification
* [node](https://nodejs.org)
* [typescript](https://typescriptlang.org)
* [sequelize](http://docs.sequelizejs.com)
* [apollo-server](https://www.apollographql.com/docs/apollo-server)
* [jest](https://jestjs.io)


## Migration

#### Init migration
```
yarn migrate:generate User
```

> Update file generated in `migrations` dir.

```
yarn migrate
```