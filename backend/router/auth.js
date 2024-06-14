const router = require("express").Router();

router.post("/login", async (req, res) => {
  res.send(req.body);
});

router.post("/register", async (req, res) => {
  res.send("Register");
});

module.exports = router;
