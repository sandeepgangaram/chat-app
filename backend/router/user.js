const router = require("express").Router();
const { auth } = require("../middleware/auth");
const { update } = require("../controllers/userController");
const { validate } = require("../validators");
const { rules: updateRules } = require("../validators/user/update");
router.put("/update", [auth, updateRules, validate], update);

module.exports = router;
