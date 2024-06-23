const router = require("express").Router();
const { auth } = require("../middleware/auth");
const {
  index,
  create,
  messages,
  deleteChat,
  imageUpload,
  addUserToGroup,
  leaveGroupChat,
} = require("../controllers/chatController");
const { chatFile } = require("../middleware/fileUpload");

router.get("/", [auth], index);
router.get("/messages", [auth], messages);
router.post("/create", [auth], create);
router.post("/add-user-to-group", [auth], addUserToGroup);
router.post("/leave-group-chat", [auth], leaveGroupChat);
router.post("/upload-image", [auth, chatFile], imageUpload);
router.delete("/:chatId", [auth], deleteChat);

module.exports = router;
