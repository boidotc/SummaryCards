module.exports = app => {
  const cards = require("../controller/card.controller.js");

  var router = require("express").Router();

  // Create a new card
  router.post("/", cards.create);

  // Retrieve all cards
  router.get("/", cards.findAll);
  //
  // // Retrieve all published cards
  // // router.get("/published", cards.findAllPublished);
  //
  // Retrieve single card with id
  router.get("/:id", cards.findOne);
  //
  // Update card with id
  router.put("/:id", cards.update);
  //
  // // Delete card with id
  router.delete("/:id", cards.delete);
  //
  // // Create new card
  // router.delete("/", cards.deleteAll);

  // Create PDF card
  router.get("/pdf/:id", cards.getPDF);

  app.use("/api/cards", router);
};
