const express = require("express");
const router = express.Router();

router.app.get("/", (req, res) => {
  // res.send("Hello World!");
  res.render("index", { title: "My Express app", title: "Hello" }); //using pug
});

module.exports = router;
