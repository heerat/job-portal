# Jobs App

The application allows users to create, read, update and delete jobs. This README file contains information on how to setup and run the application, as well as information on the development process, including information about tools used, project structure, and other relevant details.

## Table of Contents

- Technologies
- Project Structure
- Getting Started
- Development Server
- Building the Application
- Running Tests
- Code Quality Tools
- Git Hooks with Husky
- CI/CD with GitHub Actions
- Dockerization

## Technologies

This application has been developed using the following technologies:

- Angular
- NgRx
- ng-bootstrap
- SCSS
- Sass Lint
- ESLint
- Prettier
- Jasmine
- Karma
- Cypress
- Git Husky
- GitHub Actions
- Docker

## Project Structure

The project follows a standard Angular project structure:

```bash
├── src
|  ├── app
|  |  ├── modules
|  |  |  ├── jobs
|  |  |  |  ├── components
|  |  |  |  |  ├── job-detail
|  |  |  |  |  |  ├── job-detail.component.html
|  |  |  |  |  |  ├── job-detail.component.spec.ts
|  |  |  |  |  |  ├── job-detail.component.ts
|  |  |  |  |  ├── job-form
|  |  |  |  |  |  ├── job-form.component.html
|  |  |  |  |  |  ├── job-form.component.spec.ts
|  |  |  |  |  |  ├── job-form.component.ts
|  |  |  |  |  ├── job-list
|  |  |  |  |  |  ├── job-list.component.html
|  |  |  |  |  |  ├── job-list.component.spec.ts
|  |  |  |  |  |  ├── job-list.component.ts
|  |  |  |  |  ├── job-modal
|  |  |  |  |  |  ├── job-modal.component.html
|  |  |  |  |  |  ├── job-modal.component.spec.ts
|  |  |  |  |  |  ├── job-modal.component.ts
|  |  |  |  ├── model
|  |  |  |  |  ├── jobs.model.ts
|  |  |  |  ├── services
|  |  |  |  |  ├── jobs.service.spec.ts
|  |  |  |  |  ├── jobs.service.ts
|  |  |  |  ├── store
|  |  |  |  |  ├── jobs.actions.ts
|  |  |  |  |  ├── jobs.effects.ts
|  |  |  |  |  ├── jobs.state.ts
|  |  |  |  ├── jobs-routing.module
|  |  |  |  ├── jobs.component.html
|  |  |  |  ├── jobs.component.spec.ts
|  |  |  |  ├── jobs.component.ts
|  |  |  |  ├── jobs.module.ts
|  |  |  ├── shared
|  |  |  |  ├── components
|  |  |  |  |  ├── datepicker-range
|  |  |  |  |  |  ├── datepicker-range.component.html
|  |  |  |  |  |  ├── datepicker-range.component.scss
|  |  |  |  |  |  ├── datepicker-range.component.spec.ts
|  |  |  |  |  |  ├── datepicker-range.component.ts
|  |  |  |  ├── model
|  |  |  |  |  ├── datepicker-range.model.ts
|  |  |  |  ├── directives
|  |  |  |  |  ├── back-button.directive.spec.ts
|  |  |  |  |  ├── back-button.directive.ts
|  |  ├── utils
|  |  |  ├── string.spec.ts
|  |  |  ├── string.ts
|  |  ├── app-routing.module.ts
|  |  ├── app.component.html
|  |  ├── app.component.spec.ts
|  |  ├── app.component.ts
|  |  ├── app.module.ts
|  ├── assets
|  |  ├── fonts
|  |  |  ├── icomoon.eot
|  |  |  ├── icomoon.svg
|  |  |  ├── icomoon.ttf
|  |  |  ├── icomoon.woff
|  |  ├── styles
|  |  |  ├── fonts.scss
|  |  |  ├── variables.scss
|  |  ├── .gitkeep
|  ├── favicon.ico
|  ├── index.html
|  ├── main.ts
|  ├── styles.scss

```

## Getting Started

To get started with the Jobs CRUD application, follow these steps:

1. Clone the repository
2. Install dependencies using npm install
3. Configure the environment variables in src/environments/environment.ts
4. Start the development server using npm start

## Node Version

Node should be installed in your system to run, build, test and format this application.

Use the folllowing command in the project directory to use the appropriate node version. Node Version manager (nvm) should be installed in your system to use these commands.

```bash
# Use the node version specified in .nvmrc file
nvm use

# Install the node version if not available
nvm install v18.14.1
```

## Development Server

To start the development server, run the following command:

```bash
npm start
```

This will start the development server and open the application in your default browser.

## Building the Application

To build the application, run the following command:

```bash
npm run build
```

This will create a dist folder with the compiled files that can be deployed to a production server.

## Running Tests

This application uses Jasmine and Karma for unit testing and Cypress for end-to-end testing. To run the tests, use the following commands:

```bash
# Run unit tests
npm run test

# Run end to end tests
npm run e2e
```

## Code Quality Tools

This application uses ESLint and Prettier to enforce code quality and formatting. To run the code quality checks, use the following commands:

```bash
npm run lint

# Format TypeScript and SCSS files
npm run format
```

The application also makes use of `.editorconfig` and `.vscode/settings.json` files to ensure code quality and code format.

## Git Hooks with Husky

This application uses Git Hooks with Husky to enforce code quality checks before commits are made. The following Git Hooks are used:

- pre-commit: runs ESLint and Prettier formatter to check for linting and formatting errors
- pre-push: runs unit tests to check for test failures

## CI/CD with GitHub Actions

This application uses GitHub Actions for continuous integration and deployment.

## Dockerization

This application uses Docker for containerization.
Make sure Docker is installed in your system.
To build the image and run the container use the following commands:

```bash
# Build image of the application
docker build -t job-app .

# Run the container using job-app image
docker run -p 4200:4200 job-app
```

## Icons

The icons used in this application is using fonts generated by [icomoon](https://icomoon.io/).
