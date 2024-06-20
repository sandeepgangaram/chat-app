const router = require("express").Router();
const { auth } = require("../middleware/auth");
const {
  index,
  create,
  messages,
  deleteChat,
} = require("../controllers/chatController");

router.get("/", [auth], index);
router.get("/messages", [auth], messages);
router.post("/create", [auth], create);
router.delete("/:id", [auth], deleteChat);

module.exports = router;
