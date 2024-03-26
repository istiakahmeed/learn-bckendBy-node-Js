const express = require("express");
const Joi = require("joi");
const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
];

const app = express();

//Get All genres
app.get("/api/genres", (req, res) => {
  res.send(genres);
});

//Create Genres
app.use(express.json());

app.post("/api/genres", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.message);
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

//create put request
app.put("/api/genres/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const genre = genres.find((genre) => genre.id === id);
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.message);

  genre.name = req.body.name;
  res.send(genre);
});
//create delete request
app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});
//create request for id
app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
  });
  return schema.validate(genre);
}
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
