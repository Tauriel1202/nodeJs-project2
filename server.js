//root of chars project
const express = require("express");
const app = express();

//cors
const cors = require("cors");
app.use(cors());

//env
const dotenv = require("dotenv");
dotenv.config();

//login
const axios = require("axios");
const githubAuthUrl = "https://github.com/login/oauth/authorize?client_id=";

//redirect to github signin
app.get("/auth", (req, res) => {
  res.redirect(`${githubAuthUrl}${process.env.GITHUB_ID}`);
});

//logged in
app.get("/success", async (req, res) => {
  const access_token = req.query.access_token;
  const result = await axios({
    method: "get",
    url: "https://api.github.com/user",
    headers: {
      Authorization: `token ` + access_token,
    },
  })
    .then((_response) => {
      return {
        status: _response.status,
        message: _response.statusText,
        data: _response.data,
      };
    })
    .catch((error) => {
      return {
        status: error.res.status,
        message: error.message,
      };
    });

  res.status(result.status).send(result);
});

//log in creds
app.get("/loginauth", async (req, res) => {
  const code = req.query.code;
  const body = {
    client_id: process.env.GITHUB_ID,
    client_secret: process.env.GITHUB_SECRET,
    code,
  };

  const options = {
    headers: {
      accept: "application/json",
    },
  };

 
  axios
    .post("https://github.com/login/oauth/access_token", body, options)
    .then((res) => res.data.access_token)
    .then((access_token) => {
      if (!access_token) {
        console.log('💩')
        return;
      } else {
        console.log('🌴🌊')     
        res.redirect("http://localhost:3000/api-docs")   
        // app.use("/", require("./routes"));
        }
      });
      
  res.send();
});

//body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader('', 'application/json')
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
  });

  //routes
app.use("/", require("./routes"));

//port
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`🎵 Listening on port ${port} 🎵`);
});
