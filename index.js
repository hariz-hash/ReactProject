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

  // app.get("/comments/:id", async (req, res) => {
  //   await MongoUtil.getDB()
  //     .collection("comments")
  //     .findOne({ _id: ObjectId(req.params.id) })
  //     .then((doc) => {
  //       res.status(200).json(doc);
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: "Could not find doc" });
  //     });
  // });

  // //retriev one document
  // app.get("/comments/:id", async (req, res) => {
  //   await MongoUtil.getDB()
  //     .collection("comments")
  //     .findOne({ _id: ObjectId(req.params.id) })
  //     .then((doc) => {
  //       res.status(200).json(doc);
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: "Could not find doc" });
  //     });
  // });

  // //add data
  // app.post("/comments", async (req, res) => {
  //   const comment = req.body;

  //   await MongoUtil.getDB()
  //     .collection("comments")
  //     .insertOne(comment)
  //     .then((result) => {
  //       res.status(201).json(result);
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: "Could not create doc" });
  //     });
  // });
  // //delete
  // app.delete("/pc/:id", async (req, res) => {
  //   await MongoUtil.getDB()
  //     .collection("pc")
  //     .remove({
  //       _id: ObjectId(req.params.id),
  //     });
  //   console.log("print");
  //   res.status(201);
  //   res.json({
  //     message: "OK",
  //   });
  // });

  // app.get("/getcomment", async (req, res) => {
  //   let crit = {};
  //   let result = await MongoUtil.getDB()
  //     .collection("comments")
  //     .find(crit)
  //     .toArray();
  //   console.log(result);
  //   res.status(200);
  //   res.json(result); //send the results back as JSON
  // });

  app.get("/cpu", async (req, res) => {
    let crit = {};
    let result = await MongoUtil.getDB().collection("cpu").find(crit).toArray();
    console.log(result);
    res.status(200);
    res.json(result); //send the results back as JSON
  });
  app.get("/gpu", async (req, res) => {
    let crit = {};
    let result = await MongoUtil.getDB().collection("cpu").find(crit).toArray();
    console.log(result);
    res.status(200);
    res.json(result); //send the results back as JSON
  });
  app.get("/motherBoard", async (req, res) => {
    let crit = {};
    let result = await MongoUtil.getDB().collection("cpu").find(crit).toArray();
    console.log(result);
    res.status(200);
    res.json(result); //send the results back as JSON
  });

  // GET ALL RESULT WITH CONNECTED
  //
  app.get("/pc", async (req, res) => {
    //pc remove verbs of url and add noun
    //Try catch
    let crit = {};
    let result = await MongoUtil.getDB()
      .collection("pc")
      .aggregate([
        {
          $lookup: {
            from: "cpu",
            localField: "cpuDetailsId",
            foreignField: "_id",
            as: "cpuDetailsId",
          },
        },
        {
          $lookup: {
            from: "gpu",
            localField: "gpuDetailsId",
            foreignField: "_id",
            as: "gpuDetailsId",
          },
        },
        {
          $lookup: {
            from: "motherboard",
            localField: "motherBoardDetailsId",
            foreignField: "_id",
            as: "motherBoardDetailsId",
          },
        },
      ])
      .toArray();
    console.log(result);
    res.status(200);
    res.json(result); //send the results back as JSON
  });
  // ADD ALL DETAILS
  app.post("/pc", async (req, res) => {
    // const body = req.body;
    const pcCase = req.body.pcCase;
    const ram = req.body.ram;
    const coolingSystem = req.body.coolingSystem;
    const thermalCompund = req.body.thermalCompund;
    const SSD = req.body.SSD; // change to came
    const operatingSystem = req.body.operatingSystem;
    const photo = req.body.photo;
    const email = req.body.email;
    const cpuDetailsId = ObjectId(req.body.cpuDetailsId);
    const gpuDetailsId = ObjectId(req.body.gpuDetailsId);
    const motherBoardDetailsId = ObjectId(req.body.motherBoardDetailsId);

    try {
      let result = await MongoUtil.getDB().collection("pc").insertOne({
        // body,
        pcCase,
        ram,
        coolingSystem,
        thermalCompund,
        SSD,
        operatingSystem,
        photo,
        email,
        cpuDetailsId,
        gpuDetailsId,
        motherBoardDetailsId,
      });
      res.status(200);
      res.send("success");
    } catch {
      res.status(500);
      res.send("failed");
    }
  });
  //
  // app.put("/updateComments/:id", async (req, res) => {

  //   const update = req.body;

  //   await MongoUtil.getDB()
  //     .collection("comments")
  //     .updateOne({ _id: ObjectId(req.params.id) }, { $set: update });
  //   res.status(200);
  //   res.send({
  //     message: "OK",
  //   });
  // });
  app.get("/pc", async (req, res) => {
    let crit = {};
    let result = await MongoUtil.getDB()
      .collection("pc")
      .aggregate([
        {
          $lookup: {
            from: "cpu",
            localField: "cpuDetailsId",
            foreignField: "_id",
            as: "cpuDetailsId",
          },
        },
        {
          $lookup: {
            from: "gpu",
            localField: "gpuDetailsId",
            foreignField: "_id",
            as: "gpuDetailsId",
          },
        },
        {
          $lookup: {
            from: "motherboard",
            localField: "motherBoardDetailsId",
            foreignField: "_id",
            as: "motherBoardDetailsId",
          },
        },
        // {
        //   $lookup: {
        //     from: "comments",
        //     localField: "messageDetails",
        //     foreignField: "_id",
        //     as: "messageDetailsId",
        //   },
        // },
      ])
      .toArray();
    console.log(result);
    res.status(200);
    res.json(result); //send the results back as JSON
  });

  // search by gpu, cpu, motherboard
  app.get("/search", async (req, res) => {
    let result = await MongoUtil.getDB()
      .collection("pc")
      .aggregate([
        //

        {
          $lookup: {
            from: "cpu",
            localField: "cpuDetailsId",
            foreignField: "_id",
            as: "CPU",
          },
        },
        { $match: { CPU: { $project: {} } } },
      ])
      .toArray();
    console.log(result);
    console.log(result);
    res.status(200);
    res.json(result); //send the results back as JSON
  });
}

main();

// START SERVER
app.listen(3008, () => {
  console.log("Server has started");
});
app.get("/", function (req, res) {
  res.send("Hello");
});
