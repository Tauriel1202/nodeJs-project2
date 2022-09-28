const swagAuto = require("swagger-autogen")();

//details of doc
const doc = {
  info: {
    title: "Week 5 Node.js project: Characters",
    description:
      "Presenting: Characters! See their stats: names, series, appearances, and homelands. Now, with sibings!",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

//the swagger json
const swagJson = "./swagger.json";

//pass to route
const endpoints = ["./routes/index.js"];

//create the file
// swagAuto(swagJson, endpoints, doc);

//run it
swagAuto(swagJson, endpoints, doc).then(async () => {
  await import("./server.js");
});
