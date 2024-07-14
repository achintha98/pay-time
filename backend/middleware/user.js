const User = require("../db/index")
var jwt = require('jsonwebtoken');
const JWTSECRET = require("../config/config")


const userMiddleWare = (req, res, next) => {
    const autherticationString = req.headers.authentication;
    const authenticationArray = autherticationString.split(" ");
    const jsonwebtoken = authenticationArray[1];
    const success = jwt.verify(jsonwebtoken, JWTSECRET);
    console.log(success);
    if (success.username) {
        req.headers.username = success.username;
        console.log(req.headers.username);
        next();
       }
          else {
            res.status(403).json({
                msg: "You are not authenticated"
            })
        }

}

module.exports = {
    userMiddleWare
}