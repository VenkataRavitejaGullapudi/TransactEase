# Project Title: **TransactEase - Transactional Fullstack App**

## Project Overview

**TransactEase** is a comprehensive full-stack application built to understand and implement transactions using MongoDB. It features a secure and user-friendly platform for user authentication, dashboard viewing, user search with debouncing, and money transfers between users. The application incorporates robust validations and uses JWT for secure login and logout processes.

## Features

- **User Authentication**: Secure sign-in and sign-up functionality.
- **User Dashboard**: View user details and account balance.
- **User Search**: Search users by name with debounced input.
- **Money Transfer**: Send money to other users with transactional integrity.
- **Protected Routes**: Secure routes accessible only to authenticated users.
- **Account Management**: User account creation with random balance assignment for mocking.
- **JWT Authentication**: Secure login and logout options using JWT.
- **Data Validation**: Comprehensive validation for user inputs and transactions.
- **MongoDB Transactions**: Handling money transfers using MongoDB sessions and transactions.

## MongoDB Transactions
- Transfer Amount Between Accounts: For each user session, tracked using database sessions, only one transaction is allowed at a time. This means a user can either send money or receive money in a single session, but not both simultaneously. This ensures the integrity and consistency of each transaction, preventing conflicts and ensuring a reliable transfer process.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/TransactEase.git
   cd TransactEase
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

4. **Setup Environment Variables**: Create a `.env` file in the backend directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRY="5m"
   PORT=3000
   ```

5. **Run the Application**:
   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd frontend
     npm start
     ```

## API Endpoints

- **Account Routes**:
  - `POST http://localhost:3000/api/v1/account/transfer`: Transfer money to another user.
  - `GET http://localhost:3000/api/v1/account/balance`: Get user's account balance.

- **User Routes**:
  - `GET http://localhost:3000/api/v1/user/bulk?filter=John`: Search users by name.
  - `PUT http://localhost:3000/api/v1/user`: Update user details.
  - `GET http://localhost:3000/api/v1/user/me`: Get authenticated user's details.
  - `POST http://localhost:3000/api/v1/user/signin`: Authenticate user and return JWT.
  - `POST http://localhost:3000/api/v1/user/signup`: Create a new user account.

> **Note**: All endpoints except `signin` and `signup` require an authorization header.

## Conclusion

TransactEase is a well-rounded project demonstrating the integration of MongoDB transactions in a full-stack application.

 Contributions and feedback are welcome!
