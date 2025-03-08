# Flight Booking Microservices Backend

## Overview
This is a microservices-based flight booking backend application built using Node.js and Express.js. The project is designed for scalability and maintainability, supporting end-to-end flight booking with various search, filter, and sorting options. The architecture includes multiple services for booking, user management, and notifications.

## Features
- **Microservices architecture** for modularity and scalability
- **Express.js server** for handling API requests
- **Logging with Winston** for debugging and monitoring
- **Environment variable management** with dotenv
- **Structured routing** with versioned API endpoints
- **Middleware handling** for request validation and authentication
- **Service layer** for business logic
- **Flight search and booking system** with filtering and sorting
- **Automated notifications** for booking confirmation and updates
- **MySQL database** with Sequelize ORM

## Flight Booking Functionalities
### Flight Search
- Users can search for flights with:
  - Departure and destination selection
  - Travel date selection
  - Number of passengers
  - Cabin class: Economy, Premium Economy, Business, First

### Filters
- Number of stops
- Airlines
- Baggage options
- Price range
- Departure and arrival time range

### Sorting
- By price
- By duration
- By arrival time

### Booking Constraints
- Seat availability validation (e.g., if one seat remains, customers cannot book three seats)
- Dynamic price calculation based on selection
- Flight booking confirmation notifications
- Mandatory online check-in within 48 hours before flight time
- E-ticket delivery via email after check-in
- Option to cancel booking
- Real-time updates for flight delays

## Project Structure
```
flight-booking-backend/
├── node_modules/            # Dependencies
├── src/                     # Source code
│   ├── config/              # Configuration files
│   │   ├── index.js         # Central config file
│   │   ├── logger-config.js # Logging setup with Winston
│   │   ├── server-config.js # Server-specific configuration
│   ├── controllers/         # Handles request logic
│   │   ├── index.js         # Centralized exports
│   │   ├── flight-controller.js # Handles flight-related requests
│   │   ├── booking-controller.js # Handles booking operations
│   ├── middlewares/         # Express middlewares
│   │   ├── index.js         # Middleware exports
│   ├── routes/              # API routes
│   │   ├── v1/              # Versioned routes
│   │   │   ├── flights.js   # Flight-related endpoints
│   │   │   ├── bookings.js  # Booking-related endpoints
│   ├── services/            # Business logic and services
│   │   ├── flight-service.js # Flight operations
│   │   ├── booking-service.js # Booking operations
│   ├── utils/               # Utility functions
│   │   ├── index.js         # Helper functions
│   ├── index.js             # Entry point of the application
├── .env                     # Environment variables
├── .gitignore               # Git ignored files
├── logs/                    # Log files
├── package.json             # Project metadata and dependencies
├── package-lock.json        # Dependency lock file
```

## Installation
### Prerequisites
Ensure you have Node.js installed on your machine.

### Steps
1. Clone the repository:
   ```sh
   git clone <https://github.com/faridomarAf/flight-booking-app.git>
   cd flight-booking-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and define necessary environment variables.

## Usage
### Development Mode
To start the server in development mode with hot-reloading:
```sh
npm run dev
```

## Dependencies
- `express`: Web framework for Node.js
- `dotenv`: Environment variable management
- `winston`: Logging library
- `http-status-codes`: Standard HTTP status codes
- `nodemon`: Development tool for auto-restarting the server
- `mysql2`: MySQL database driver
- `sequelize`: ORM for MySQL
- `sequelize-cli`: CLI tool for managing Sequelize


## Author
**Farid**

