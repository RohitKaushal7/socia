const path = require("path");
const fs = require("fs");
const http = require("http");

const express = require("express");
require("dotenv").config();
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

// CONFIG
const PORT = process.env.PORT || 5000;

// ROUTING

// LISTEN
server.listen(PORT, () => {
  console.log(`listning on localhost:${PORT}`);
});
