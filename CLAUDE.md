# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Run Commands
- Build: `npm run build` (Runs TypeScript compiler)
- Development: `npm run dev` (Uses nodemon for hot-reloading)
- Start: `npm run start` (Runs built JavaScript)
- Start with watch: `npm run start:dev` (Runs TypeScript compiler with watch mode)

## Code Style Guidelines
- **Architecture**: Clean Architecture pattern with layers (presentation, application, domain, infrastructure)
- **Imports**: Group imports by external packages first, then internal modules
- **Types**: Strict typing is enabled, define interfaces for all data structures
- **Naming Conventions**:
  - Use PascalCase for interfaces, classes, and types (`IUserRepository`, `UserEntity`)
  - Use camelCase for variables, functions, and methods
  - Use UPPER_CASE for constants
- **Error Handling**: Use custom ErrorResponse class for consistent error responses
- **Middlewares**: Use middleware pattern for cross-cutting concerns (JWT, error handling)
- **Function Parameters**: Pass dependencies object to controllers and use cases
- **Async Pattern**: Use try/catch with next(error) for error propagation in Express

## Repository Structure
- Microservice architecture with separate services
- Each service follows clean architecture principles
- Services communicate via Kafka message broker