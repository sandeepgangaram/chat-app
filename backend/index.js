const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
