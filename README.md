# Rabobank Customer Statement Processor

Rabobank receives monthly deliveries of customer statement records. This information is delivered in two formats, CSV and XML. These records need to be validated.

The format of the file is a simplified version of the MT940 format. The format is as follows:

| Field                 | Description                               |
| :-------------------- | :---------------------------------------- |
| Transaction reference | A numeric value                           |
| Account number        | An IBAN                                   |
| Start Balance         | The starting balance in Euros             |
| Mutation              | Either an addition (+) or a deduction (-) |
| Description           | Free text                                 |
| End Balance           | The end balance in Euros                  |

## Requirements

There are two validations:

1. all transaction references should be unique

2. the end balance needs to be validated

At the end of the processing, a report needs to be created which will display both the transaction reference and description of each of the failed records.

## CI/CD Process

The application has been deployed to the Azure container service. You can access it using the following link: https://rabobank.azurewebsites.net/

For every commit to the main branch, the GitHub workflow will perform the following actions:
- Compose a container and push it to Docker Hub
- Pull the container from Docker Hub and deploy it to Azure Container Service
- Deployment workflow: [main workflow](https://github.com/surezhbtech/rabobank-csp/actions/workflows/main_rabobank.yml)

In addition, the GitHub workflow will also:
- Check for Typescript lint errors
- Test the code
- Publish the test [coverage report](https://github.com/surezhbtech/rabobank-csp/actions/workflows/coverage.yml)

Also, the CI process checks the code using [typescript lint](https://typescript-eslint.io/) and [prettier](https://prettier.io/).

The test coverage report is published at GitHub Pages: https://surezhbtech.github.io/rabobank-csp/lcov-report/index.html

You can find the Docker Hub repository at: https://hub.docker.com/r/surezh/aadvik/tags

## Building and running your application

### Built With

- [Angular](http://angular.io/)
- [Angular Material](https://material.angular.io/)
- [Node](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com)
- [Docker](https://www.docker.com/)
- [Jest](https://jestjs.io)

### Install workspace dependencies

Install workspace packages

```sh
cd ~/rabobank-csp
yarn
```

#### Run client

To run the client:

```sh
cd ~/rabobank-csp
yarn start

#or

ng serve
```

#### Run web server

To run the web server:

```sh
cd ~/rabobank-csp
yarn serve:ssr
```

#### To Compose docker

When you're ready, start your application by running:
`docker compose up --build`.

Your application will be available at http://localhost:80.

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

#### Running unit tests

```sh
cd ~/rabobank-csp
yarn test
```
