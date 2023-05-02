//Auth Router
const express = require("express");
import {Auth} from "../models/authmodel.js"
const authRouter = express.Router();
authRouter.route("/signup").get(getSignUp).post(postSignUp);

function getSignUp(req, res) {
  res.sendFile("/public/index.html", { root: __dirname });
}
async function postSignUp(req, res) {
  let obj = req.body;
  let data = await Auth.create(obj);
  console.log(data);
}

//logIn
authRouter.route("/login").post(loginUser);

async function loginUser(req, res) {
  try {
    let data = req.body;
    let user = await Auth.findOne({ email: data.email });
    if (user) {
      if (user.password == data.password) {
        return res.json({
          message: "User has logged in",
          userDetails: data,
        });
      } else {
        return res.json({
          message: "Wrong Password",
        });
      }
    } else {
      return res.json({
        message: "user not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      result: err.message,
    });
  }
}

module.exports = authRouter;
