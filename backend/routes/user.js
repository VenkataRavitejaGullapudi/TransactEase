const express = require("express");
const z = require("zod");
const { User, Account } = require("../db");
var jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middlewares/middleware");
const crypto = require("crypto");

const userRouter = express.Router();

const signUpBody = z.object({
  userName: z.string().min(3).max(30).transform(
    (value) => value.toLowerCase()
  ),
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  password: z.string().min(6),
});

userRouter.post("/signup", async (req, res) => {
  const { success, data } = signUpBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  req.body = data;

  const existingUser = await User.findOne({
    userName: req.body.userName,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "UserName already taken / Incorrect inputs",
    });
  }

  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = crypto
    .pbkdf2Sync(req.body.password, salt, 1000, 64, "sha512")
    .toString("hex");

  const newUser = await User.create({
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hashedPassword,
    salt: salt,
  });
  const userId = newUser._id;

  /* Creating an account and initializing with random balances */

  await Account.create({
    userId: userId,
    balance: 10 + Math.floor(Math.random() * 100000),
  });

  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET
  );

  return res.status(201).json({
    message: "User created successfully",
    token,
  });
});

const signInBody = z.object({
  userName: z.string().min(3).max(30),
  password: z.string().min(6),
});

userRouter.post("/signin", async (req, res) => {
  const { success } = signInBody.safeParse(req.body);
  if (!success) {
    console.log(req.body);
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const user = await User.findOne({
    userName: req.body.userName,
  });
  if (!user) {
    return res.status(411).json({
      message: "Error while signing in",
    });
  }

  const hashedPassword = crypto
    .pbkdf2Sync(req.body.password, user.salt, 1000, 64, "sha512")
    .toString("hex");

  if (hashedPassword !== user.password) {
    return res.status(411).json({
      message: "Incorrect password",
    });
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET
  );

  return res.status(201).json({
    message: "User signed in successfully",
    token,
  });
});

const updateBody = z.object({
  firstName: z.string().max(50).optional(),
  lastName: z.string().max(50).optional(),
  password: z.string().min(6).optional(),
});

userRouter.put("", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    console.log(req.body);
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  if (req.body.password) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = crypto
      .pbkdf2Sync(req.body.password, salt, 1000, 64, "sha512")
      .toString("hex");
    req.body.password = hashedPassword;
    req.body.salt = salt;
  }

  const response = await User.updateOne(
    {
      _id: req.userId,
    },
    req.body
  );

  return res.status(200).json({
    message: "Updated successfully",
    response,
  });
});

userRouter.get("/bulk", async (req, res) => {
  const nameFilter = req.query.filter || "";

  const users = await User.find(
    {
      $or: [
        { firstName: { $regex: nameFilter, $options: "i" } },
        { lastName: { $regex: nameFilter, $options: "i" } },
      ],
    },
    {
      password: 0,
      salt: 0,
    }
  );

  return res.status(200).json({
    users: users,
  });
});

module.exports = userRouter;
