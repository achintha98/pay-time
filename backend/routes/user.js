const {Router} = require("express");
const zod = require("zod") 
const { userMiddleWare } = require("../middleware/user");
const express = require('express');
const router = Router();
const app = express();
const {User} = require("../db/index");
var jwt = require('jsonwebtoken');
const JWTSECRET = require("../config/config")

router.post("/signup", async (req, res) => {
    console.log(req.body);
    const UserSchema = zod.object({
        username: zod.string().email('Invalid email format'),
        firstname: zod.string(),
        lastname: zod.string(),
        password: zod.string()
      });
      const result = UserSchema.safeParse({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      });
      if (!result.success) {
          return res.json({message: "Incorrect inputs"});
      }
      const existingUser = await User.findOne({
        username: req.body.username
      })
      console.log(existingUser);
      if(existingUser) {
        return res.json({message: "Email already taken"});
      }
      const jwtToken = jwt.sign({ username: req.body.username }, JWTSECRET);
      await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      })

      return res.json({
        message: "User created successfully",
        jwt: jwtToken
      });
})

router.post("/signin", async (req, res) => {
    const UserSchema = zod.object({
        username: zod.string().email('Invalid email format'),
        password: zod.string()
      });
      const result = UserSchema.safeParse({
        username: req.body.username,
        password: req.body.password,
      });
      if (!result.success) {
          return res.json({message: "Incorrect inputs"});
      }
      const existingUser = await User.findOne({
        username: req.body.username,
        password: req.body.password
      })
      if(existingUser) {
        const jwtToken = jwt.sign({ username: req.body.username }, JWTSECRET);
        return res.json({
            message: "Signed in successfully",
            jwt: jwtToken
          }); }
        return res.json({
            message: "Error while logging in"
          })
})

module.exports = {
    router
}