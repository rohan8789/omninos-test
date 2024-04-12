const { validationResult } = require("express-validator");
const d = require("uuid");

const Product = require("../models/product");
const User = require("../models/user");
const mongoose = require("mongoose");

const uuid = d.v4;

let products = [
  {
    image: "https://m.media-amazon.com/images/I/518SodzDYHS._SX679_.jpg",
    price: "450",
    description: "This is shopping site1 data from server",
  },
  {
    image: "https://m.media-amazon.com/images/I/81fHXyDezmL._SX695_.jpg",
    price: "600",
    description: "This is shopping site2 data from server",
  },
  {
    image: "https://m.media-amazon.com/images/I/61g0ITGgnlL._SX679_.jpg",
    price: "900",
    description: "This is shopping site3 data from server",
  },
  {
    image:
      "https://rukminim2.flixcart.com/image/850/1000/xif0q/headphone/1/8/l/-original-imagqhswqgpwb2yu.jpeg?q=20&crop=false",
    price: "1000",
    description: "THis is shopping site4 data from server",
  },
];


const getPlacesByUserID = async (req, res, next) => {
  let userId = req.params.userId;
  let user;
  console.log(userId);
  if (!products) {
    return res
      .status(404)
      .json({ message: "No user places exist by this user id" });
  }
  let name = null;
  if (user) name = user.name;
  console.log(products);
  res.json({
    user: name === null ? "you" : user.name,
    products: products,
  });
};

const createPlace = async (req, res, next) => {
  
  console.log(req.body);
  const { price, description, address} = req.body;
  
  const createdPlace = new Place({
    price,
    image: req.file.path,
    description,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    // console.log(error);
    return res
      .status(400)
      .json({ message: "Creating a place in failed in try-catch..." });
  }
  res.status(201).json({ place: createdPlace });
};


module.exports = {
  getPlacesByUserID,
  createPlace,
};
