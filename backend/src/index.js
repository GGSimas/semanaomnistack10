const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./routes");
const { setWebsocket } = require("./websocket");
//   "mongodb+srv://week10:week10@cluster0-2naru.mongodb.net/week10?retryWrites=true&w=majority",
const app = express();
const server = http.Server(app);

setWebsocket(server);

mongoose.connect("mongodb://localhost:27017/week10", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(cors());
app.use(express.json());
app.use(route);

server.listen(3333);
