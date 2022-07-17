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
    content: req.body.content ? req.body.content : {},
    topics: req.body.topics ? req.body.topics : [],
    keywords: req.body.keywords ? req.body.keywords : [],
    references: req.body.references ? req.body.references : [],
    path_pdf: req.body.path_pdf ? req.body.path_pdf : "",
    path_content: req.body.path_content ? req.body.path_content : "",
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

// Retrieve all Cards from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Card.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cards."
      });
    });
};

// Find a single Card with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Card.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Card with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Card with id=" + id });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Card.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Card with id=${id}. Maybe Card was not found!`
        });
      } else {
        res.send({
          message: "Card was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Card with id=" + id
      });
    });
};

// Update a Card by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Card.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Card with id=${id}. Maybe Card was not found!`
        });
      } else res.send({ message: "Card was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Card with id=" + id
      });
    });
};