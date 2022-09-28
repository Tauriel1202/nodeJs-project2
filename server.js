//root of chars project
const express = require('express');
const app = express();

//cors
const cors = require('cors');
app.use(cors());

//env
const dotenv = require('dotenv');
dotenv.config();

//body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('', 'application/json')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
})

//routes
app.use('/', require('./routes'))

//port
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`🎵 Listening on port ${port} 🎵`);
});
