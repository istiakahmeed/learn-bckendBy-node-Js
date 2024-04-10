const express = require("express");

const app = express();

// app.get("/", (req, res) => {
//   res.send("<h1>Thanks for your request</h1>");
// });

//create api and return json object

app.get("/", (req, res) => {
  const obj = {
    name: "Minal",
    email: "minal@gmail",
  };
  res.json(obj);
});
app.listen(4000, () => {
  console.log("I am listening on 4000");
});
