const { sequelize } = require("../models");
const { Op } = require("sequelize");
const User = require("../models").User;

exports.update = async (req, res) => {
  if (req.file) {
    req.body.avatar = req.file.filename;
  }

  if (req.body.avatar == null || req.body.avatar.length === 0) {
    delete req.body.avatar;
  }

  try {
    const [rows, result] = await User.update(req.body, {
      where: {
        id: req.user.id,
      },
      returning: true,
      individualHooks: true,
    });

    const user = result[0].get({ raw: true });
    user.avatar = result[0].avatar;
    delete user.password;

    res.send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.search = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        [Op.or]: {
          namesConcated: sequelize.where(
            sequelize.fn(
              "concat",
              sequelize.col("firstName"),
              " ",
              sequelize.col("lastName")
            ),
            {
              [Op.iLike]: `%${req.query.term}%`,
            }
          ),
          email: {
            [Op.iLike]: `%${req.query.term}%`,
          },
        },
        [Op.not]: {
          id: req.user.id,
        },
      },
      limit: 10,
    });

    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
