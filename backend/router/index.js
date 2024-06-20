const router = require("express").Router();
const authRoutes = require("./auth");
const userRoutes = require("./user");
const chatRoutes = require("./chat");

router.use("/", authRoutes);
router.use("/users", userRoutes);
router.use("/chats", chatRoutes);

module.exports = router;
