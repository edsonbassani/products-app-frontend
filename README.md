# Products App Frontend

This project is the frontend of the **Products App**, developed with **Angular 19** using **Standalone Components**. 
It consumes the backend API and offers functionalities such as authentication and product management.

![Build Status](https://img.shields.io/github/actions/workflow/status/edsonbassani/products-app-frontend/angular.yml?label=Lint)
![Build Status](https://img.shields.io/github/actions/workflow/status/edsonbassani/products-app-frontend/angular.yml?label=Build)
![Build Status](https://img.shields.io/github/actions/workflow/status/edsonbassani/products-app-frontend/angular.yml?label=Tests)

## Tech Stack
- **Angular 19**
- **RxJS**
- **Bootstrap**  
- **Angular Forms**  
- **JWT Authentication**  
- **Standalone Components**

## Features
- **Authentication**
  - Login screen with field validation.
  - Storage of the JWT token in localStorage.
  - Interceptor to include the token in the header of all HTTP requests.
- **Products**
  - Product listing with pagination and filters.
  - Create, edit, and delete products.

## Project Structure
- src/app/core: Services and interceptors for authentication.
- src/app/features: Functionality modules, such as Login and Products.
- src/app/shared: Reusable components and utilities.

## Tests
- Initial implementation of unit tests for the components and services.

## Pipeline CI/CD
The repository contains a basic pipeline configured in GitHub Actions for build automation and testing.


## Configuration and execution

### 1. Clone Repo
```bash
git clone https://github.com/edsonbassani/products-app-frontend.git
cd products-app-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment setup
```bash
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7181/api'
};
```

## Development server

To start a local development server, run:

```bash
npm run start:ssl
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Screenshots

### Login Screen
![image](https://github.com/user-attachments/assets/9c8b0e54-4a5d-4995-b82e-61d9ae7dcbeb)

### Products Screen
![image](https://github.com/user-attachments/assets/9d81ca33-511a-4009-b459-30a586afbf8a)



