const db = require("../model");
const Card = db.card;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a card
  const card = new Card({
    title: req.body.title,
    description: req.body.description,
    topics: req.body.topics ? req.body.topics : {},
    keywords: req.body.keywords ? req.body.keywords : {},
    references: req.body.references ? req.body.references : {},
    path_pdf: "",
    path_content: ""
  });

  card
    .save(card)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the card."
      });
    });
};
