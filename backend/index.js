const express = require("express");
const cors = require("cors");
const appConfig = require("./config/app");
const router = require("./router/index");
const SocketServer = require("./socket");
const http = require("http");

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/uploads"));

const port = appConfig.appPort;

const server = http.createServer(app);
SocketServer(server);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
