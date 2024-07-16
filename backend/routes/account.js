const {Router} = require("express");
const accoutRouter = Router();
const accountMiddleware = require("../middleware/account")
const {Account} = require("../db/index");

accoutRouter.get("/balance", accountMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })
    res.json({
        balance: account.balance
    })
})

accoutRouter.post("/transfer", accountMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })

    if(account.balance < req.body.amount) {
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: req.body.to
    })

    if (!toAccount) {
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({
        userId: req.userId,
        balance: account.balance - req.body.amount
    })

    await Account.updateOne({
        userId: req.body.to,
        balance: toAccount.balance + req.body.amount
    })

    return res.json({
            message: "Transfer successful"
    })
    
})

module.exports = accoutRouter;