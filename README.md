# Car Dealership API

A comprehensive RESTful API for managing a car dealership system. This application provides endpoints for car inventory management, customer management, manager operations, authentication, and car purchase functionality.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Cars](#cars)
  - [Customers](#customers)
  - [Managers](#managers)
  - [Purchases](#purchases)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Car Dealership API is designed to provide a complete backend solution for car dealership operations. It allows for managing car inventory, customer data, manager operations, and purchase transactions. The API is built with security in mind, implementing JWT-based authentication and role-based access control.

## Features

- **Authentication & Authorization**: Secure user registration, login, and password management with JWT
- **Role-based Access Control**: Different access levels for customers and managers
- **Car Inventory Management**: Add, update, delete, and filter cars by various criteria
- **Customer Management**: Register and manage customer information
- **Manager Operations**: Special privileges for dealership managers
- **Purchase Processing**: Handle car purchase transactions
- **Data Validation**: Comprehensive input validation for all API endpoints

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **TypeScript**: Type-safe JavaScript
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/Sherifsani/car-dealership.git
cd car-dealership
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Setup**

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. **Build the project**

```bash
npm run build
```

## Usage

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

The server will start on the port specified in your environment variables (default: 3000).

## API Documentation

### Authentication

#### Register User

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Auth Required**: No
- **Body**:
  ```json
  {
    "firstname": "John",
    "lastname": "Doe",
    "role": "customer",
    "email": "john@example.com",
    "password": "password"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "success": true,
    "message": "User created successfully",
    "data": {
      "firstname": "John",
      "lastname": "Doe"
    }
  }
  ```

#### Login

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Auth Required**: No
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password",
    "role": "customer"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "success": true,
    "message": "Login successful",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### Change Password

- **URL**: `/api/auth/change-password`
- **Method**: `POST`
- **Auth Required**: Yes (Bearer Token)
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "oldPassword": "password",
    "newPassword": "newpassword",
    "role": "customer"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "success": true,
    "message": "Password changed successfully"
  }
  ```

### Cars

#### Get All Cars

- **URL**: `/api/cars/get`
- **Method**: `GET`
- **Auth Required**: No
- **Success Response**: `200 OK`
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "123456789",
        "carModel": "Optima",
        "price": 65000,
        "year": 2021,
        "manufacturer": "Nissan",
        "category": ["Sedan", "Electric"],
        "availability": true,
        "stock": 10,
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    ]
  }
  ```

#### Get Cars with Filters

- **URL**: `/api/cars/get/filter/?category=Sedan`
- **Method**: `GET`
- **Auth Required**: No
- **Query Parameters**: 
  - `category`: Filter cars by category
- **Success Response**: `200 OK`
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "123456789",
        "carModel": "Optima",
        "price": 65000,
        "year": 2021,
        "manufacturer": "Nissan",
        "category": ["Sedan", "Electric"],
        "availability": true,
        "stock": 10,
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    ]
  }
  ```

#### Add New Car

- **URL**: `/api/cars/post`
- **Method**: `POST`
- **Auth Required**: Yes (Bearer Token, Manager role)
- **Body**:
  ```json
  {
    "carModel": "Optima",
    "price": 65000,
    "year": 2021,
    "manufacturer": "Nissan",
    "categoryNames": ["Sedan", "Electric"],
    "availability": true,
    "stock": 10
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "success": true,
    "data": {
      "carModel": "Optima",
      "price": 65000,
      "year": 2021,
      "manufacturer": "Nissan",
      "category": ["Sedan", "Electric"],
      "availability": true,
      "stock": 10,
      "_id": "123456789",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  }
  ```

#### Delete Car

- **URL**: `/api/cars/delete/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes (Bearer Token, Manager role)
- **URL Parameters**: 
  - `id`: ID of the car to delete
- **Success Response**: `200 OK`
  ```json
  {
    "success": true,
    "message": "Car deleted successfully",
    "data": {
      "_id": "123456789",
      "carModel": "Optima",
      "price": 65000,
      "year": 2021,
      "manufacturer": "Nissan",
      "category": ["Sedan", "Electric"],
      "availability": true,
      "stock": 10,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  }
  ```

### Customers

#### Get All Customers

- **URL**: `/api/customers/get`
- **Method**: `GET`
- **Auth Required**: Yes (Bearer Token, Manager role)
- **Success Response**: `200 OK`
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "123456789",
        "firstname": "John",
        "lastname": "Doe",
        "email": "john@example.com",
        "role": "customer",
        "purchasedCars": []
      }
    ]
  }
  ```

#### Get Customer by ID

- **URL**: `/api/customers/get/:id`
- **Method**: `GET`
- **Auth Required**: Yes (Bearer Token, Manager role)
- **URL Parameters**: 
  - `id`: ID of the customer to retrieve
- **Success Response**: `200 OK`
  ```json
  {
    "success": true,
    "data": {
      "_id": "123456789",
      "firstname": "John",
      "lastname": "Doe",
      "email": "john@example.com",
      "role": "customer",
      "purchasedCars": []
    }
  }
  ```

### Managers

#### Get All Managers

- **URL**: `/api/managers/get`
- **Method**: `GET`
- **Auth Required**: Yes (Bearer Token, Manager role)
- **Success Response**: `200 OK`
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "123456789",
        "firstname": "Tom",
        "lastname": "Smith",
        "email": "tom@example.com",
        "role": "manager"
      }
    ]
  }
  ```

### Purchases

#### Purchase Car

- **URL**: `/api/purchase`
- **Method**: `POST`
- **Auth Required**: Yes (Bearer Token)
- **Body**:
  ```json
  {
    "customerId": "123456789",
    "carId": "987654321"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "success": true,
    "message": "Purchase successful",
    "purchase": {
      "customer": "123456789",
      "car": "987654321",
      "price": 65000,
      "_id": "123456789",
      "date": "2023-01-01T00:00:00.000Z"
    }
  }
  ```


## License

This project is licensed under the ISC License - see the LICENSE file for details.