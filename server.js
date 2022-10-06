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

  await axios
    .post("https://github.com/login/oauth/access_token", body, options)
    .then((res) => res.data.access_token)
    .then((access_token) => {
      console.log(access_token);
      if (!access_token) {
        console.log("💩");
        return;
      } else {
        console.log("🌴🌊");
        // res.send(`<a href="http://localhost:3000/success?access_token="`+ access_token + `>Continue</a>`)
        // res.headersSent
        // res.send(`<a href="http://localhost:3000/success">Continue</a><br><a href="http://localhost:3000/api-docs">Go to Docs</a>`)
        return res.redirect(
          // "http://tauriel341-project2/success?access_token=" + access_token
          'http://localhost:3000/success?access_token=' + access_token
        );
        // app.use("/", require("./routes"));
      }
    });
    res.send()
  // res.send(
  //   `<a href="http://localhost:3000/success">Continue</a><br><a href="http://localhost:3000/api-docs">Go to Docs</a>`
  // );
});

//logged in
app.get("/success", async (req, res) => {
  console.log('👀')
  const access_token = req.query.access_token;
  const result = axios({
    method: "get",
    url: "https://api.github.com/user",
    headers: {
      Authorization: `Bearer OAUTH-TOKEN` + access_token,
    },
  })
    .then((res) => {
      console.log('🧝‍♀️')
      return {
        status: res.status,
        message: res.statusText,
        data: res.data,
      };
    })
    .catch((error) => {
      console.log('⚠')
      return {
        status: error.status,
        message: error.message,
      };
    });

  res.status(400).send(result);
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
