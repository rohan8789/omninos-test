const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const getAllUserDetails = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password -repassword -email");
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Fetching user failed, try again..." });
  }
  res
    .status(201)
    .json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const registerUser = async (req, res) => {
  
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return res.status(500).json({ message: "Sign-up failed. Try again..." });
  }
  
  if (existingUser) {
    return res
    .status(422)
    .json({ message: "User already registered, Login instead" });
  }
  

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res.status(500).json({ message: "password encryption failed" });
  }
  const createdUser = new User({
    name, //as good as name: name
    email,
    password: hashedPassword,
  });
  try {
    await createdUser.save();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to insert user details to db..." });
  }


  res
    .status(201)
    .json({
      message: "Registration Successful, Please Login...",
      userId: createdUser.id,
      email: createdUser.email,
    });
};

const loginUser = async (req, res, next) => {
  // console.log(req.body);
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return res.status(500).json({ message: "Login failed..." });
  }
  if (!existingUser) {
    return res
    .status(403)
    .json({ message: "User does not exist in our database" });
  }
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return res.status(500).json({ message: "Invalid credientials" });
  }
  if (!isValidPassword) {
    return res.status(403).json({ message: "Invalid credientials" });
  }
  
  console.log(existingUser, "We reached here");
  res
  .status(201)
    .json({
      name: existingUser.name,
      userId: existingUser.id,
      email: existingUser.email,
    });
};

module.exports = { registerUser, loginUser, getAllUserDetails };
