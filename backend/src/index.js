const express = require("express");
const route = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");

//   "mongodb+srv://week10:week10@cluster0-2naru.mongodb.net/week10?retryWrites=true&w=majority",
const app = express();
mongoose.connect("mongodb://localhost:27017/week10", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(cors());
app.use(express.json());
app.use(route);

app.listen(3333);
