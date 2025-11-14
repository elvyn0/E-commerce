const express = require("express");
const {
  addToCart,
  getUserCart,
  updateCart,
} = require("../controllers/cartController");
const authUser = require("../middlewares/auth");

const cartRouter = express.Router();

cartRouter.post("/get", authUser, getUserCart);
cartRouter.post("/add", authUser, addToCart);
cartRouter.patch("/update", authUser, updateCart);

module.exports = cartRouter;
