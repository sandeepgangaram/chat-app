const router = require("express").Router();
const { auth } = require("../middleware/auth");
const { update, search } = require("../controllers/userController");
const { validate } = require("../validators");
const { rules: updateRules } = require("../validators/user/update");
const { userFile } = require("../middleware/fileUpload");

router.put("/update", [auth, userFile, updateRules, validate], update);
router.get("/search-users", auth, search);

module.exports = router;
