const router = require("express").Router();
const authRoutes = require("./auth");

router.get("/", async (req, res) => {
  res.send("Home");
});

router.use("/", authRoutes);

module.exports = router;
