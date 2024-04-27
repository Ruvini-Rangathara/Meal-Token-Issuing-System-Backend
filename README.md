# EatoToken Backend


## Introduction

Welcome to the backend documentation for EatoToken, the revolutionary meal token issuing system. This backend component is responsible for managing the database, handling business logic, and serving data to the frontend.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **PostgreSQL**: A powerful, open-source relational database system used for storing meal and user data.
- **TypeORM**: An Object-Relational Mapping (ORM) tool that allows seamless interaction with the PostgreSQL database.

## Setup

1. **Clone the Repository**: Clone the EatoToken backend repository from [GitHub Repository Link](https://github.com/Ruvini-Rangathara/Meal-Token-Issuing-System-Backend.git).
2. **Install Dependencies**: Navigate to the project directory and run `npm install` to install all the necessary dependencies.
3. **Set Environment Variables**: Set up the required environment variables for database connection, Firebase configuration, and any other sensitive data.
4. **Database Migration**: Run database migrations to create the necessary tables and schema in PostgreSQL. Use the command `npm run migration:run`.
5. **Start the Server**: Start the NestJS server by running `npm run start`.

## Project Structure

The backend project is structured as follows:

```
src/
|-- controller/         # Controllers for handling HTTP requests
|-- dto/                # Data Transfer Objects for input validation and serialization
|-- entity/             # TypeORM entities representing database tables
|-- service/            # Business logic services
|-- util/               # Others utility functions
|-- app.module.ts       # Main module file defining application configuration
|-- main.ts             # Entry point of the application
```

## API Endpoints

The backend provides the following API endpoints for interaction with the frontend:

1. **Items API**: CRUD operations for managing food items.
    - `GET /api/item`
    - `POST /api/item`
    - `GET /api/item/:id`
    - `PUT /api/item/:id`
    - `DELETE /api/item/:id`
   

2. **Meals API**: CRUD operations for managing meals.
    - `GET /api/meals`
    - `POST /api/meals`
    - `GET /api/meals/:id`



---

## API Documentation
Click here to see documentation  : [Link](https://documenter.getpostman.com/view/28283365/2sA3BuUnrL)


---