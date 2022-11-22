// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const ObjectId = require("mongodb").ObjectId;
// const MongoUtil = require("./MongoUtill");

// const mongoUrl = process.env.MONGO_URI;

// let app = express();

// // !! Enable processing JSON data
// app.use(express.json());

// // !! Enable CORS
// app.use(cors());

// async function main() {
//   //   let db = await MongoUtil.connect(mongoUrl, "pc_build");
//   //   console.log("connecteds");
//   //   app.post("/addcomments", async function (req, res) {
//   //     const comments = req.body;
//   //     db.collection("comments")
//   //       .insertOne(comments)
//   //       .then((result) => {
//   //         res.status(201).json(result);
//   //       })
//   //       .catch((err) => {
//   //         res.status(500).json({ err: "could not create new doc" });
//   //       });
//   //   });
// }
// main();

// // START SERVER
// app.listen(3000, () => {
//   console.log("Server has started");
// });

// SETUP BEGINS
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { ObjectId } = require("mongodb");
const MongoUtil = require("./MongoUtil");

const mongoUrl = process.env.MONGO_URL;

let app = express();

// !! Enable processing JSON data
app.use(express.json());

// !! Enable CORS
app.use(cors());

// SETUP END
async function main() {
  await MongoUtil.connect(mongoUrl, "pc_build");

  //retriev one document
  app.get("/comments/:id", async (req, res) => {
    await MongoUtil.getDB()
      .collection("comments")
      .findOne({ _id: ObjectId(req.params.id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not find doc" });
      });
  });
  app.post("/comments", async (req, res) => {
    const comment = req.body;

    await MongoUtil.getDB()
      .collection("comments")
      .insertOne(comment)
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not create doc" });
      });
  });
  app.delete("/deleteComments/:id", async (req, res) => {
    await MongoUtil.getDB()
      .collection("comments")
      .remove({
        _id: ObjectId(req.params.id),
      });
    res.status(200);
    res.send({
      message: "OK",
    });
  });
}

main();

// START SERVER
app.listen(3000, () => {
  console.log("Server has started");
});
app.get("/", function (req, res) {
  res.send("Hello");
});
