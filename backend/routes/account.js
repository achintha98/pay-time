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

module.exports = accoutRouter;