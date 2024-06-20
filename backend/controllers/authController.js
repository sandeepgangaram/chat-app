const User = require("../models").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const appConfig = require("../config/app");

exports.register = async (req, res) => {
  try {
    //create user
    const user = await User.create(req.body);

    //generate auth token
    const userWithToken = generateToken(user.get({ raw: true }));
    return res.send(userWithToken);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

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
      return res.status(404).json({ message: "User not found" });
    }

    //send 401 if password dont match
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //generate auth token
    const userWithToken = generateToken(user.get({ raw: true }));
    userWithToken.user.avatar = user.avatar;

    return res.send(userWithToken);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const generateToken = (user) => {
  delete user.password;
  const token = jwt.sign(user, appConfig.appKey, { expiresIn: 604800 });
  return { user: { ...user }, token };
};
