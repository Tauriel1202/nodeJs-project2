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

app.get("/auth", (req, res) => {
  res.redirect(`${githubAuthUrl}${process.env.GITHUB_ID}`);
});

app.get("/loggedIn", async (req, res) => {
  const token = req.query.access_token;
  const result = await axios({
    method: "get",
    url: "https://api.github.com/user",
    headers: {
      Authorization: `token ` + token,
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
        status: error.response.status,
        message: error.message,
      };
    });

  response.status(result.status).send(result);
});

app.get("/authLogin", async (req, res) => {
  const code = req.query.code;
  const body = {
    client_id: process.dotenv.GITHUB_ID,
    client_secret: process.dotenv.GITHUB_SECRET,
    code,
  };

  const options = {
    headers: {
      accept: "application/json",
    },
  };

  axios
    .post("https://github.com/login/oauth/access_token", body, options)
    .then((res) => res.data.token)
    .then((token) => {
      if (!token) {
        return;
      } else {
        return response.redirect(
          "http://localhost:3000/loggedIn?token=" + token
        );
      }
    });

  response.send();
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
