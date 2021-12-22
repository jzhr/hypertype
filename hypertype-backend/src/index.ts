import express from "express";
import path from "path";
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

import routes from "./routes/api";

// Create server and port
const app = express();
const port = process.env.PORT || 3500;

app.use(express.static(path.join(__dirname, "build")));

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});

// Connect to database
dotenv.config();
const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection established.");
  })
  .catch((err: any) => console.error(err));

app.use(cors());

// Set up routing
app.use("/", routes);
