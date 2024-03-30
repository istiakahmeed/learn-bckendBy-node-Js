const express = require("express");
const Joi = require("joi");

const router = express.Router();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
];

//Get All genres

//Create Genres

router.app.post("/", (req, res) => {
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
router.app.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const genre = genres.find((genre) => genre.id === id);
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.message);

  genre.name = req.body.name;
  res.send(genre);
});
//create delete request
router.app.delete("/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});
//create request for id
router.app.get("/:id", (req, res) => {
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

module.exports = router;
