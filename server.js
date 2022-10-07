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
    .then((res) => {
      console.log("🍂", res);
      token = res.data.access_token;
      console.log("🌟", token);
    })
    .then(() => {
      return res.redirect(
        "http://localhost:3000/success?access_token=" + token
      );
    });
  res.send();
  // res.send(
  //   `<a href="http://localhost:3000/success">Continue</a><br><a href="http://localhost:3000/api-docs">Go to Docs</a>`
  // );
});

//logged in
app.get("/success", async (req, res) => {
  console.log("👀");
  const access_token = req.query.access_token;
  // const tempToken = "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"
  const result = await axios({
    method: "get",
    url: "https://api.github.com/user",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then((res) => {
      console.log("🧝‍♀️");
      console.log(res)
      return {
        status: res.status,
        message: res.statusText,
        data: res.data,
      };
    })
    .catch((error) => {
      console.log("🚫");
      console.log(error)
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
