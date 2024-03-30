const express = require("express");
const router = express.Router();

router.app.get("/", (req, res) => {
  res.send(genres);
});

module.exports = router;
