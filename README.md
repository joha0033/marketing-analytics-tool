## Requirements

- Docker
- Node v13.2.0 (for local development)

## Quick Start

### Running in Docker

```
docker-compose up --build
```

### Developing locally

```bash
# Go inside the directory
cd marketing-analytics-tool

# Install dependencies
yarn

# Start development server
yarn dev
```

### Adding Data

Simply add the properly formatted Test Data into the root level `./data` folder and let it process.

## Documentation

### Stack details:

- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [webpack](https://webpack.js.org/)
- [Express](https://expressjs.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Docker](https://www.docker.com/)
- [MongoDB](https://www.mongodb.com/)

### Folder Structure

All the source code will be inside **src** directory. Inside src, there is client and server directory. All the frontend code (react, css, js and any other assets) will be in client directory. Backend Node.js/Express code will be in the server directory.

### Wishlist:

- [ ] Split Observer.ts in to it's own microservice that has options to monitor an FTP location.
- [ ] Split mapping out to it's own microservice and admin panel for better metadata
- [ ] Add more API endpoints for creating products, services, etc
- [ ] Validation of products and services, right now it's pretty open and isn't fault tolerant.
- [ ] Authentication!!! This ain't a free service.
- [ ] More tests.
- [ ] Internationalization.
