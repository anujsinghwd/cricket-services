# Cricket Match Tracking System

## Project Overview

This project is a Cricket Match Tracking System developed using NestJS, Mongoose, and TypeScript. The system is designed to manage cricket matches, track ball-by-ball events, and update player, team, and match statistics in real-time. The architecture follows Clean Architecture principles to ensure scalability, maintainability, and testability.

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Setup and Installation](#setup-and-installation)
- [Folder Structure](#folder-structure)

## Architecture

The project follows Clean Architecture principles, organizing the codebase into layers that separate concerns and ensure a clear dependency flow.

### Layers

1. **Domain**: 
   - Contains business logic and entities. The core of the application, free of external dependencies.

2. **Application**:
   - Contains use cases, services, and business rules. This layer interacts with the domain layer to perform operations.

3. **Infrastructure**:
   - Handles database interactions, repositories, and external services. This layer is where Mongoose schemas and database-specific logic reside.

4. **Interfaces**:
   - Manages the interaction with the outside world through controllers and views. This layer handles HTTP requests and responses.

### Key Components

- **Entities**: Define the core objects and their behaviors in the domain.
- **Repositories**: Provide a clean abstraction over data persistence.
- **Services**: Implement the application's use cases and interact with repositories.
- **Controllers**: Handle incoming HTTP requests and delegate operations to the services.

## Setup and Installation

### Prerequisites

- Node.js (>= 14.x)
- npm or Yarn
- MongoDB

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/cricket-match-tracking-system.git
   cd cricket-match-tracking-system
   ```

2. **Install Dependencies**:
   ```bash
   git clone https://github.com/yourusername/cricket-match-tracking-system.git
   cd cricket-match-tracking-system
   ```

3. **Environment Variables:**:

   Create a .env file in the root directory and configure the following variables:

   ```bash
   MONGO_URI=URI
   DATABASE=NAME
   PORT=3002
   ```

4. **Migrate Team and players Data For Testing:**:

*NOTE:* Database connection is required

   ```bash
   npm run migration
   ```


## Folder Structure
```
src/
│
├── application/
│   ├── services/
│   └── dtos/
│
├── domain/
│   ├── entities/
│   └── repositories/
│
├── infrastructure/
│   ├── database/
│   │   ├── mongoose/
│   │   │   ├── schemas/
│   │   │   └── repositories/
│   └── http/
│
├── interfaces/
│   ├── http/
│   │   └── controllers/
│
├── app.module.ts
└── main.ts
```

## Explanation

- **application/services:** Contains service classes that implement business logic.
- **domain/entities:** Holds the core business entities (e.g., Match, Player, Team).
- **domain/repositories:** Defines interfaces for the repository pattern.
- **infrastructure/database/mongoose/schemas:** Mongoose schemas for data persistence.
- **infrastructure/database/mongoose/repositories:** Implements repository interfaces using Mongoose.
- **interfaces/http/controllers:** Handles incoming HTTP requests and routes them to the appropriate services.