const path = require("path");
const fs = require("fs");
const http = require("http");

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

const { ApolloServer, gql } = require("apollo-server-express");
const graphSchema = require("./graphql/schema");
const graphQLServer = new ApolloServer(graphSchema);
graphQLServer.applyMiddleware({ app });

// CONFIG
const PORT = process.env.PORT || 5000;

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// STATIC
app.use(express.static(path.resolve("public")));

// ROUTING
const authRoutes = require("./routes/auth");
const { initChat } = require("./sockets");
app.use("/api", authRoutes);

// SPA
app.use("/*", (req, res) => {
  res.sendFile(path.resolve("public", "index.html"));
});

// CHAT
initChat(server);

// LISTEN
server.listen(PORT, () => {
  console.log(`listning on localhost:${PORT}`);
});
