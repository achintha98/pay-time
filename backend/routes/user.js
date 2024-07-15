const {Router} = require("express");
const zod = require("zod") 
const { userMiddleWare } = require("../middleware/user");
const express = require('express');
const userRouter = Router();
const app = express();
const {User} = require("../db/index");
const {Account} = require("../db/index");
var jwt = require('jsonwebtoken');
const JWTSECRET = require("../config/config")

userRouter.post("/signup", async (req, res) => {
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
      const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      })
      console.log("testttt");

      console.log(user._id);
      await Account.create({
        userId: user._id,
        balance: Math.floor(Math.random() * (10000 - 1) + 1)
      })
      return res.json({
        message: "User created successfully",
        jwt: jwtToken
      });
})

userRouter.post("/signin", async (req, res) => {
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

userRouter.put("/user", userMiddleWare, async (req, res) => {
  const UserSchema = zod.object({
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
    password: zod.string().optional()
  });
  const result = UserSchema.safeParse({
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });
  if(!result.success) {
    return res.json({
        message: "Error while updating information"
    })
  }
  const updatedUser = await User.findOneAndUpdate({username: req.headers.username}, {
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  }, {
    new: true
  });
  console.log(updatedUser);
  return res.json({
      message: "Updated successfully"
  })
})

userRouter.get("/user/bulk", userMiddleWare, async (req, res) => {

  const filter_condition = req.query.filter;
  console.log(req.query);
  console.log(filter_condition);

  
  const users = await User.find().or([{ firstname: filter_condition }, { lastname: filter_condition }])

  console.log(users);
  if (users) {
  return res.json({
    users: users
  })
  }
  return res.json ({
    message: "user does not exists"
  })


})


module.exports = userRouter;