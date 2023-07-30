const userModel = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler')

const createUser = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400)
      throw new Error("Username or Password is required");
    }

    const isExist = await userModel.findOne({ username });
    if (isExist) {
        res.status(400)
      throw new Error("Username already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ username, password: hashedPassword });

    if(user) {
        res.status(200).json({ message: "User created successfully", user });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400)
      throw new Error("Username or Password is required");
    }

    const isExist = await userModel.findOne({ username });
    if (!isExist) {
        res.status(404)
      throw new Error("Username does not exist");
    }

    if (isExist && (await bcrypt.compare(password, isExist.password))) {
      const accessToken = jwt.sign(
        {
          user: { username, id: isExist._id },
        },
        process.env.JWT,
        { expiresIn: "1day" }
      );
      res
        .status(200)
        .json({
          message: "logged in successfully",
          token: accessToken,
          user: isExist,
        });
    } else {
      res.status(400).json({ message: "Username or password is wrong" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createUser, loginUser };
