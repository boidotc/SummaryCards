const db = require("../model");
const Card = db.card;
const PDFDocument = require('pdfkit');
var fs = require('fs');
var path = require('path');

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
    references: req.body.references ? req.body.references : [],
    path_pdf: req.body.path_pdf ? req.body.path_pdf : "",
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

// Get or create PDF card 
exports.getPDF = (req, res) => {
  const id = req.params.id;


  Card.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Card with id " + id });
      else {
        const doc = new PDFDocument({autoFirstPage:false});

        // Define default page
        doc.on('pageAdded', () => {
          // background gradient
          let grad = doc.linearGradient(0, 0, 610, 800);
          grad.stop(0, '#8EC5FC')
              .stop(1, '#E0C3FC');
          doc.rect(0, 0, 610, 800);
          doc.fill(grad);

          // MC stamp
          // doc.image("stamps/iconblack.png", 5, 5); // TODO: continue to improve

          // content support container
          let dist = 40;
          doc.rect(dist, dist, 570-dist, 765-dist);
          doc.opacity(0.363).fill("#3d3d3d");
          doc.fillColor('white').opacity(1);
        });
        let filename = id+'.pdf';
        let pdfPath = 'blobstore/'+filename;
        doc.pipe(fs.createWriteStream(pdfPath)); // write to PDF
        doc.addPage();

        /** Start card layout **/ 
        // Title
        doc.fillColor('white').opacity(1).fontSize(35).text(data.title, {
          align: 'center',
        }).moveDown();

        //Topics (v2) 
        if (data.topics.length > 0){
          doc.fillColor('white').opacity(1).fontSize(16).text("Topics:", {
            underline: true,
            align: 'left'
          }).moveDown();
          let topicList = "";
          for(let i=0;i<data.topics.length;i++){
            topicList += data.topics[i]
            if (i!=(data.topics.length-1)) {
              topicList += " - ";
            }
          }
          doc.fillColor('white').opacity(1).fontSize(12).text(topicList).moveDown().moveDown();
        }
        
        // Description
        doc.fillColor('white').opacity(1).fontSize(20).text(data.description, {
          align: 'center',
        }).moveDown();
        
        // Content 
        for(let i=0;i<data.content.length;i++){
          doc.fillColor('white').opacity(1).fontSize(16).text(data.content[i].paragraphTitle, {
            underline: true,
            align: 'justify',
          }).moveDown();
          doc.fillColor('white').opacity(1).fontSize(12).text(data.content[i].paragraphContent, {
            align: 'justify',
          }).moveDown();
        }
        
        
        doc.end();

        // Update the pdf path attribute
        data.path_pdf = pdfPath;
        Card.findByIdAndUpdate(id,data, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Card with id=${id}. Maybe Card was not found!`
            });
          } else {
            var options = {
              root: path.join("./")
            };
            res.download(pdfPath, filename, function (err) {
              if (err) {
                console.log(err);
            } else {
                //console.log('Sent:', filename);
            }
            });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).send({
            message: "Error updating Card with id=" + id
          });
        });
      }
    }).catch(err => {
      console.log(err);
      res
        .status(500)
        .send({ message: "Error retrieving Card with id=" + id});
    });

  
}