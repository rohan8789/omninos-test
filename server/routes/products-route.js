const express = require("express");
const { check } = require("express-validator");

// const fileUpload = require("../middleware/file-upoad");
// const validateAuth = require("../middleware/auth-validate");

const router = express.Router();

const {
  getPlacesByUserID,
} = require("../controller/product-controller");



router.get("/user/:userId", getPlacesByUserID);

// router.use(validateAuth);

module.exports = router;
