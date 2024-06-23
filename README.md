## Wallet Transactions Playground

### Backend

- Dependencies
  "node"
  "cors"
  "express"
  "jsonwebtoken"
  "mongoose"
  "zod"

- User Routes

  - Sign up (Creates an account with random balance by default)
  - Sign In
  - Update
  - Get all users or get by using name filters

- Account Routes
  - Get balance
  - Transfer amount between accounts (For each user session, tracked using database sessions, only one transaction is allowed at a time. This means a user can either send money or receive money in a single session, but not both simultaneously).

### Frontend
