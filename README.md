# Expense Tracker Application Backend
A robust Node.js/Express backend for managing personal expenses with user authentication and CRUD operations for expenses.

## Features
- User authentication (registration and login)
- JWT-based authorization
- Expense management (create, read, update, delete)
- MongoDB integration
- Secure password hashing
- CORS enabled
- Environment variables configuration

## Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running
- npm or yarn package manager

## Installation
1. Clone the repository:
```
git clone https://github.com/rakibahmad007/Expense-Tracker-Application-backend.git
cd expense-tracker-backend
```
2. Install dependencies:
```
npm install
```
3. Create a **.env** file in the root directory with the following variables:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Project Structure
```
src/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── expenseController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── expenseModel.js
│   └── userModel.js
├── routes/
│   ├── authRoutes.js
│   └── expenseRoutes.js
└── app.js
```
## Available Scripts
- ```npm start```: Starts the server in production mode
- ```npm run dev```: Starts the server in development mode with nodemon

## API Endpoints
## Authentication
- **POST** ``` /api/auth/register ```
  - Register a new user
  - Body: ``` { "email": "user@example.com", "username": "username123", "password": "password123" } ```
- **POST** ``` /api/auth/login ```
  - Login a user
  - Body: ``` { "email": "user@example.com", "password": "password123" } ```

## Expenses (Protected Routes)
All expense routes require a valid JWT token in the Authorization header:
``` Authorization: Bearer <your_token> ```
- **GET** ``` /api/expenses ```
  - Get all expenses for the authenticated user
- **POST** ``` /api/expenses ```
  - Create a new expense
  - Body:
      json:
```
{
  "description": "Grocery shopping",
  "amount": 50.00,
  "category": "Food",
  "date": "2024-01-13"
}
```
- **PUT** ``` /api/expenses/:id ```
  - Update an existing expense
  - Body: Same as POST
-  **DELETE**  ``` /api/expenses/:id ```
  - Delete an expense

## Security Features
- Password hashing using bcryptjs
- JWT token authentication
- Protected routes using middleware
- CORS enabled for secure cross-origin requests
- Request body parsing and sanitization

## Expense Model
```
{
  user: { type: ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now }
}
```

## Error Handling
The application includes comprehensive error handling for:

- Database connection errors
- Authentication errors
- Validation errors
- Request processing errors
- Server errors

      
          








  
   
