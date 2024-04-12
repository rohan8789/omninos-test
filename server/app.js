const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const placeRouter = require("./routes/products-route");
const usersRouter = require("./routes/user-route");

const app = express();

// app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use(bodyParser.json());
app.use(cors());
app.use("/api/users", usersRouter);
app.use("/api/products", placeRouter);

app.use((req, res, next) => {
  // if (req.file) {
  //   fs.unlink(req.file.path);
  // }
  res.status(404).json({ message: "Can not find this route" });
  next();
});

mongoose
  .connect(
    `mongodb+srv://rohansinghrp180:fISzwjZitBiEmlKc@cluster0.d8asrvn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(process.env.PORT||8000, () => {
      console.log("server is up and running...");
    });
  })
  .catch((error) => {
    console.log(error);
  });
