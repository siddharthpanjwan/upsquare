const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userModel = require("./models/UserModel");
const cors = require("cors");
const { restart } = require("nodemon");
mongoose.connect("mongodb://localhost:27017/sid_practical", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cors());
const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");
  app.listen(5000, () => {
    console.log("server listening on port 5000");
  });
});

app.use(express.json()); //Used to parse JSON bodies
express.urlencoded({
  // to support URL-encoded bodies
  extended: true,
});

//endpoints
app.post("/api/signup", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) res.sendStatus(401);
    else {
      const hashedPassword = hash;
      const user = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      };
      userModel.create(user, (err, data) => {
        if (err) res.sendStatus(500);
        else {
          console.log(data);
          res.status(201).send(data);
        }
      });
    }
  });
});
app.post("/api/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  const info = await userModel.findOne({
    email: email,
  });
  console.log(info);
  if (info == undefined) {
    res.send("user not found");
  } else {
    //verifying password
    bcrypt.compare(password, info.password, (err, result) => {
      if (result == false) res.sendStatus(401); //unauthorized
      if (result == true) {
        //login success need to genrate token
        const user = {
          email,
          password,
        };
        const accessToken = jwt.sign(user, "mysecretkey");
        res.json({
          success: 1,
          message: "login successful",
          accessToken,
        });
      }
    });
  }
});

app.get("/api/userdetails", authenticateToken, async (req, res) => {
  const user = await userModel.findOne({
    email: req.user.email,
  });
  res.json(user);
});
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "mysecretkey", (err, authData) => {
    if (err) return res.sendStatus(403);
    req.user = authData;
    next();
  });
}
