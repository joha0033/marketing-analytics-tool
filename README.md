## Requirements

- Node v13.2.0

## Quick Start

### Running in Docker

```
docker-compose up --build
```

If you make changes to the `package.json` remember to rebuild with no cache:

```
docker-compose build --no-cache
```

### Developing locally

```bash
# Go inside the directory
cd simple-react-full-stack

# Install dependencies
yarn

# Start development server
yarn dev
```

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
- [ ] Add more API endpoints for creating products, services, etc
- [ ] Validation of products and services, right now it's pretty open
- [ ] Authentication!!! This ain't a free service.
- [ ] More tests.
