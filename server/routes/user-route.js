const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUserDetails,
} = require("../controller/user-controller");

router.get("/", getAllUserDetails);
router.post("/signup", registerUser);
router.post("/login", loginUser);

module.exports = router;
