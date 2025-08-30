# SutraMD

A modern blog platform with a Next.js frontend and NestJS API backend, built as an Nx monorepo.

## Demo

https://github.com/user-attachments/assets/122fb0d8-c9bb-4e5d-8e63-37fdd8d75b81


## Overview

SutraMD is a modern blogging platform that allows users to create, manage, and publish markdown-based content. The application provides a clean user interface for writing and organizing blog posts, with robust backend services for content management.

## Architecture

This project is built as an Nx monorepo with the following main applications:

- **Frontend**: A Next.js application for the user-facing interface
- **API**: A NestJS application providing RESTful services
- **Shared Libraries**: Common code shared between applications

### Data Flow

```
[Frontend (Next.js)] <---HTTP/REST---> [API (NestJS)] <---EdgeDB/GEL---> [Database]
       │                                     │
       │                                     │
       └──────────shared types──────────────┘
                (through libs)
```

## Tech Stack

- **Frontend**:

  - Next.js
  - React
  - TailwindCSS
  - TypeScript

- **Backend**:

  - NestJS
  - EdgeDB with GEL
  - TypeScript

- **Tooling**:
  - Nx monorepo
  - ESLint
  - Jest
  - GitHub Actions

## Getting Started

### Prerequisites

- Node.js 16+
- Yarn
- EdgeDB

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/sutramd.git
   cd sutramd
   ```

2. **Install dependencies**:

   ```bash
   yarn install
   ```

3. **Set up environment variables**:

   ```bash
   # For API
   cp apps/api/.env.example apps/api/.env
   # Update with your database credentials
   ```

4. **Start the EdgeDB database**:

   ```bash
   # If you have Docker installed
   docker-compose up -d edgedb

   # Or if you have EdgeDB CLI
   edgedb project init
   ```

5. **Build the projects**:
   ```bash
   yarn build
   ```

## Development

### Starting Development Servers

To start both the API and frontend in development mode:

```bash
# Start everything
yarn dev

# Start only API
yarn start:api

# Start only frontend
yarn start:frontend
```

### Working with Nx

This project uses Nx for managing the monorepo. Some useful commands:

```bash
# Run a command on a specific project
nx run [project]:[command]

# Run a command only on projects affected by your changes
nx affected --target=[command]

# Visualize your project dependency graph
nx graph
```

## Project Structure

```
sutramd/
├── apps/
│   ├── api/               # NestJS Backend
│   │   ├── src/
│   │   │   ├── blog/      # Blog functionality
│   │   │   ├── auth/      # Authentication services
│   │   │   ├── user/      # User management
│   │   │   ├── geldata/   # EdgeDB connection services
│   │   │   └── dbschema/  # Generated database schema
│   │   └── project.json   # API build configuration
│   ├── frontend/          # Next.js Frontend
│   │   ├── src/
│   │   │   ├── pages/     # Next.js page components
│   │   │   ├── components/# Reusable React components
│   │   │   └── icons/     # UI icons
│   │   ├── lib/           # Utility functions
│   │   └── styles/        # CSS and styling
│   └── api-e2e/           # API End-to-End Tests
├── libs/
│   └── gel/               # Shared EdgeDB/GEL Library
└── nx.json                # Nx Configuration
```

## Available Commands

| Command               | Description                                     |
| --------------------- | ----------------------------------------------- |
| `yarn dev`            | Start both frontend and API in development mode |
| `yarn build`          | Build all projects                              |
| `yarn build:api`      | Build only the API                              |
| `yarn build:frontend` | Build only the frontend                         |
| `yarn start:api`      | Start the API server                            |
| `yarn start:frontend` | Start the frontend server                       |
| `yarn lint`           | Run linting on all projects                     |
| `yarn test`           | Run tests on all projects                       |
| `yarn nx graph`       | Visualize the project dependency graph          |

## Database

SutraMD uses EdgeDB with the GEL client for database operations. The database schema is defined in the API project and schemas are automatically generated.

### Database Schema

The main entities in the database are:

- **User**: Authentication and user management
- **MarkdownFile**: Blog post content
- **Folder**: Organization structure for content

### Migrations

To run database migrations:

```bash
cd apps/api
yarn migrate:dev
```

## API Documentation

The API documentation is available through Swagger UI when running the API server:

```
http://localhost:3001/docs
```

Key API endpoints:

- `/blog`: Blog post management
- `/auth`: Authentication
- `/user`: User management

## Deployment

### Preparing for Production

1. **Build all projects**:

   ```bash
   yarn build
   ```

2. **Set production environment variables**:
   ```
   # In your production environment
   NODE_ENV=production
   ```

### Deployment Options

- **Frontend**: Can be deployed to Vercel, Netlify, or any static hosting service
- **API**: Can be deployed to any Node.js hosting service like Heroku, AWS, or GCP

## Contributing

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Run tests and linting**:
   ```bash
   yarn affected:test
   yarn affected:lint
   ```
5. **Commit your changes**:
   ```bash
   git commit -m "Add some feature"
   ```
6. **Push to the branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a pull request**

## License

[MIT](LICENSE)
