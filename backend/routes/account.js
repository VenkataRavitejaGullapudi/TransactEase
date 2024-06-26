const express = require("express");
const { authMiddleware } = require("../middlewares/middleware");
const { Account } = require("../db");
const z = require("zod");
const { default: mongoose, set } = require("mongoose");

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });

    if (!account) {
      console.log("No account linked to user");
      return res.status(404).json({
        error: "Account not found",
      });
    }

    return res.status(200).json({
      balance: account.balance,
    });
  } catch (error) {
    console.error("Error fetching account balance:", error);
    return res.status(500).json({
      error: "Failed to fetch account balance",
    });
  }
});

const transferRequest = z.object({
  to: z.string(),
  amount: z.number(),
});

/*  Transfer money from one account to another (Only one transaction happens either send or recieve at a time for a single user by using the sessions below) */
accountRouter.post(
  "/transfer",
  authMiddleware,
  async function transferAmount(req, res) {
    const { success, data } = transferRequest.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        error: "Invalid request body",
      });
    }
    if (data.to === req.userId) {
      return res.status(400).json({
        error: "Cannot transfer money to yourself",
      });
    }

    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const account = await Account.findOne({
        userId: req.userId,
      }).session(session);

      if (!account || account.balance < data.amount) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          error: "Insufficient balance",
        });
      }

      const toAccount = await Account.findOne({
        userId: data.to,
      }).session(session);

      if (!toAccount) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({
          error: "Recipient account invalid or not found",
        });
      }

      await Account.updateOne(
        { userId: req.userId },
        { $inc: { balance: -data.amount } }
      ).session(session);

      await Account.updateOne(
        { userId: data.to },
        { $inc: { balance: data.amount } }
      ).session(session);

      await session.commitTransaction();
      session.endSession();

      return res.status(200).json({
        message: "Transfer successful",
      });
    } catch (error) {
      if (session.inTransaction()) {
        await session.abortTransaction();
      }
      session.endSession();
      if (error?.code === 112) {
        setTimeout(() => {
          transferAmount(req, res);
        }, 1000);
        console.log("Transaction conflict found, retrying in 1 second");
        // return res.status(400).json({
        //     error: "Please try again later. Aborted due to transaction conflict"
        // })
      } else {
        console.error(
          "Error transferring money:",
          error,
          error.message,
          error.code
        );

        return res.status(500).json({
          error: "Failed to transfer money",
        });
      }
    }
  }
);

/* Below is simple but bad solution that may fail when 
1. Multiple requests are made at the same time
2. One of the requests fails in the middle of the process
3. The money is deducted from the sender but not credited to the receiver
4. The money is credited to the receiver but not deducted from the sender
5. The money is deducted from the sender and credited to the receiver but the database is not updated properly */

accountRouter.post(
  "/transfer/badSolution",
  authMiddleware,
  async (req, res) => {
    const { success, data } = transferRequest.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        error: "Invalid request body",
      });
    }

    const account = await Account.findOne({
      userId: req.userId,
    });

    if (!account || account.balance < data.amount) {
      return res.status(422).json({
        error: "Insufficient balance",
      });
    }

    const toAccount = await Account.findOne({
      userId: data.to,
    });

    if (!toAccount) {
      return res.status(404).json({
        error: "Recipient account invalid or not found",
      });
    }

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -data.amount } }
    );

    await Account.updateOne(
      { userId: data.to },
      { $inc: { balance: data.amount } }
    );

    return res.status(200).json({
      message: "Transfer successful",
    });
  }
);

module.exports = accountRouter;
