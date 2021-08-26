const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser')
const path = require('path');
const routes = require('./routes/api');
const mongoose = require('mongoose');
require('dotenv').config();

// Create server and port
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});

// Connect to database
dotenv.config();
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useCreateIndex: true, 
  useUnifiedTopology:true })
  .then(() => {
    console.log("MONGO CONNECTED")
  })
  .catch(err => console.log());

app.use(cors());
app.use(bodyParser.json());

// Set up routing
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/api', routes);