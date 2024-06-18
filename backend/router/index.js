const router = require("express").Router();
const authRoutes = require("./auth");
const userRoutes = require("./user");

router.use("/", authRoutes);
router.use("/users", userRoutes);

module.exports = router;
