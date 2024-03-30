const express = require("express");
const genres = require("./routes/genres");
const home = require("./routes/home");
const app = express();

app.use(express.json());
app.use("/api/genres", genres);
app.use("/", home);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
