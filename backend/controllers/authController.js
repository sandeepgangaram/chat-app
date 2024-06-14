const User = require("../models").User;
const bcrypt = require("bcrypt");
const { raw } = require("express");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //find user
    const user = await User.findOne({
      where: {
        email,
      },
    });

    //send error if user not found
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    //send 401 if password dont match
    if (!bcrypt.compareSync(password, user.password)) {
      res.status(401).json({ message: "Invalid credentials" });
    }

    //generate auth token
    const userWithToken = generateToken(user.get({ raw: true }));

    res.send(userWithToken);
  } catch (error) {}
};

exports.register = async (req, res) => {
  res.send("Register");
};

const generateToken = (user) => {
  delete user.password;
  const token = jwt.sign(user, "secret", { expiresIn: 604800 });
  return { ...user, token };
};
