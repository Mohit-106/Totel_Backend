//Auth Router
import  express from "express";
import {Auth} from "../models/authmodel.js"
const authRouter = express.Router();

// authRouter.route("/signup").get(getSignUp).post(postSignUp);
// function getSignUp(req, res) {
//   res.sendFile("/public/index.html", { root: __dirname });
// }
// async function postSignUp(req, res) {
//   let obj = req.body;
//   let data = await Auth.create(obj);
//   console.log(data);
// }

// Create a new customer
authRouter.post("/signup", async (req, res) => {
    try {
      const user = new Auth(req.body);
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Failed to signUp" });
    }
  });





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

export default authRouter;
