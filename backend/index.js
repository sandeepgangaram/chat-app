require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.APP_PORT;

app.use(cors());

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
