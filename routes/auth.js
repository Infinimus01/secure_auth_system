const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

// fake db
const users = [];

//signup route

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  //check if user exist
  const userExists = users.find((u) => u.username === username);
  if (userExists) return res.status(400).json({ msg: "User already exists" });

  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  //save user
  users.push({ username, password: hashedPassword });

  //print res

  res.json({ msg: "user registration successful" });
});

//login route

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!username) return res.status(400).json({ msg: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

  //create session

  req.session.username = username;

  res.json({ msg: " login successful" });
});

// dashboard route

router.get("/dashboard", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "unauthorized user" });
  }
  res.json({ msg: "welcome to dashboard" });
});
//logout route 

router.post("/logout", async(req, res)=> {
  req.session.destroy();
  res.json({msg: "logged out successfully"})

});

module.exports = router;
