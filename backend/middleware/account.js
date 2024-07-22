const Account = require("../db/index")
var jwt = require('jsonwebtoken');
const JWTSECRET = require("../config/config")

const accountMiddleware = (req, res, next) => {
    const autherticationString = req.headers.authentication;
    const authenticationArray = autherticationString.split(" ");
    const jsonwebtoken = authenticationArray[1];
    console.log(jsonwebtoken);
    const success = jwt.verify(jsonwebtoken, JWTSECRET);
    console.log(success);
    if (success) {
        const {userId} = success;
        req.headers.userId = userId;
        console.log(userId);
        next();
       }
          else {
            res.status(403).json({
                msg: "You are not authenticated"
            })
        }

}

module.exports = accountMiddleware;