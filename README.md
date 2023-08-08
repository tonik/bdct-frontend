[![Can I deploy Status](https://ermingo.pactflow.io/pacticipants/frontend/branches/main/latest-version/can-i-deploy/to-environment/production/badge)](https://ermingo.pactflow.io/pacticipants/frontend/branches/main/latest-version/can-i-deploy/to-environment/production/badge)

## Description
This frontend application is part of a bi-directional contract testing example built using React, Next.js, MSW, Jest, and PactJS along with the @pactflow/pact-msw-adapter. The application is the consumer in our contract testing example.

## Features
- Frontend built using React and Next.js
- Mock Service Worker (MSW) for seamless backend mocking
- Testing using Jest and PactJS
- Integration with Pactflow for contract testing with `@pactflow/pact-msw-adapter`
- CI/CD integration through GitHub Actions

## Technologies Used
- React
- Next.js
- MSW
- Jest
- PactJS
- `@pactflow/pact-msw-adapter`
- Docker

## Requirements
- Node.js v18
- Docker
- GitHub Actions Workflow

There are three jobs defined in this workflow: test, can_i_deploy, and deployment.

## CI workflow
### test
The test job is run on every push to the main branch. It starts by setting up Node.js, installs dependencies using Yarn, then runs the tests defined in the Makefile via make test. After successful test execution, it publishes the consumer contract using make publish_consumer_contract.

Environment variables are defined to specify the Pact Broker Base URL, Pact Broker Token, the name of the participant (in this case, 'frontend'), and other variables related to reporting and versioning.

### can_i_deploy
The can_i_deploy job is dependent on the test job and only runs if the test job passes. It checks if it's safe to deploy the consumer (frontend in this case) to production using make can_i_deploy.

### deployment
The deployment job depends on the can_i_deploy job and only runs if the can_i_deploy job passes. It deploys the frontend and records the deployment using make deploy and make record_deployment commands respectively.


### Development
Run the following command to start the app in development mode:

```bash
yarn dev
```

### Test
To map the CI process locally execute the command:
```bash
make ci
```
