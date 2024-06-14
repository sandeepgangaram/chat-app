const express = require("express");
const cors = require("cors");
const appConfig = require("./config/app");

const app = express();
const port = appConfig.appPort;

app.use(cors());

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
