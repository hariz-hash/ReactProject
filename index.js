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
  await MongoUtil.connect(mongoUrl, "pc_");

  // app.get("/user", async (req, res) => {
  //   let crit = { email: "dex@gmail.com" };
  //   let result = await MongoUtil.getDB().collection("pc").find(crit).toArray();
  //   console.log(result);
  //   res.status(200);
  //   res.json(result); //send the results back as JSON
  // });
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
  app.delete("/pc/:id", async (req, res) => {
    try {
      await MongoUtil.getDB()
        .collection("pc")
        .remove({
          _id: ObjectId(req.params.id),
        });
      console.log("print");
      res.status(201);
      res.json({
        message: "OK",
      });
    } catch (e) {
      res.status(500);
      res.send("failed");
    }
  });

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
    try {
      let crit = {};
      let result = await MongoUtil.getDB()
        .collection("cpu")
        .find(crit)
        .toArray();
      // console.log(result);
      res.status(200);
      res.json(result); //send the results back as JSON
    } catch (e) {
      res.status(500);
      res.send("failed");
    }
  });
  app.get("/gpu", async (req, res) => {
    try {
      let crit = {};
      let result = await MongoUtil.getDB()
        .collection("gpu")
        .find(crit)
        .toArray();
      // console.log(result);
      res.status(200);
      res.json(result); //send the results back as JSON
    } catch (e) {
      res.status(500);
      res.send("failed");
    }
  });
  app.get("/motherBoard", async (req, res) => {
    try {
      let crit = {};
      let result = await MongoUtil.getDB()
        .collection("motherboard")
        .find(crit)
        .toArray();
      // console.log(result);
      res.status(200);
      res.json(result); //send the results back as JSON
    } catch (e) {
      res.status(500);
      res.send("failed");
    }
  });

  // GET ALL RESULT WITH CONNECTED

  app.get("/pc", async (req, res) => {
    //pc remove verbs of url and add noun
    //Try catch
    try {
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
      // console.log(result);
      res.status(200);
      res.json(result); //send the results back as JSON
    } catch (e) {
      res.status(500);
      res.send("failed");
    }
  });
  app.get("/user/:email", async (req, res) => {
    //pc remove verbs of url and add noun
    //Try catch
    try {
      var email = req.params.email;

      let crit = {};
      let result = await MongoUtil.getDB()
        .collection("pc")
        .aggregate([
          {
            $match: {
              email: email,
            },
          },
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
      // console.log(result);
      res.status(200);
      res.json(result); //send the results back as JSON
    } catch (e) {
      res.status(500);
      res.send("failed");
    }
  });

  app.get("/pc/:id", async (req, res) => {
    //pc remove verbs of url and add noun
    //Try catch
    try {
      let id = ObjectId(req.params.id);

      let crit = {};
      let result = await MongoUtil.getDB()
        .collection("pc")
        .aggregate([
          {
            $match: {
              _id: id,
            },
          },
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
      // console.log(result);
      res.status(200);
      res.json(result); //send the results back as JSON
    } catch (e) {
      res.status(500);
      res.send("failed");
    }
  });

  // ADD ALL DETAILS
  app.post("/pc", async (req, res) => {
    // const body = req.body;
    try {
      const pcCase = req.body.pcCase;
      const ram = req.body.ram;
      const coolingSystem = req.body.coolingSystem;
      const thermalCompund = req.body.thermalCompund;
      const SSD = req.body.SSD; // change to came
      const operatingSystem = req.body.operatingSystem;
      const email = req.body.email;
      const cpuDetailsId = ObjectId(req.body.cpuDetailsIdedit);
      console.log(req.body.cpuDetailsIdedit);
      const gpuDetailsId = ObjectId(req.body.gpuDetailsIdedit);
      console.log(req.body.gpuDetailsIdedit);

      const motherBoardDetailsId = ObjectId(req.body.motherBoardId);
      console.log(motherBoardDetailsId);

      let result = await MongoUtil.getDB().collection("pc").insertOne({
        pcCase,
        ram,
        coolingSystem,
        thermalCompund,
        SSD,
        operatingSystem,
        email,
        cpuDetailsId,
        gpuDetailsId,
        motherBoardDetailsId,
      });
      res.status(200);
      res.send("success");
    } catch (e) {
      res.status(500);
      res.send("failed");
    }
  });
  //
  // app.put("/pc/:id", async (req, res) => {
  //   let {
  //     pcCase,
  //     ram,
  //     coolingSystem,
  //     thermalCompund,
  //     SSD,
  //     operatingSystem,
  //     email,
  //   } = req.body;
  //   let updatePc = {
  //     pcCase: pcCase,
  //     ram: ram,
  //     coolingSystem: coolingSystem,
  //     thermalCompund: thermalCompund,
  //     SSD: SSD,
  //     operatingSystem: operatingSystem,
  //     email: email,
  //   };
  //   await MongoUtil.getDB()
  //     .collection("pc")
  //     .updateOne({ _id: ObjectId(req.params.id) }, { $set: updatePc });
  //   res.status(200);
  //   res.send({
  //     message: "OK",
  //   });
  // });

  // app.get("/pc/_id")
  //index  getting id

  // app.get("/pc", async (req, res) => {
  //   let crit = {};
  //   let result = await MongoUtil.getDB()
  //     .collection("pc_")
  //     .aggregate([
  //       {
  //         $lookup: {
  //           from: "cpu",
  //           localField: "cpuDetailsId",
  //           foreignField: "_id",
  //           as: "cpuDetailsId",
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "gpu",
  //           localField: "gpuDetailsId",
  //           foreignField: "_id",
  //           as: "gpuDetailsId",
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "motherboard",
  //           localField: "motherBoardDetailsId",
  //           foreignField: "_id",
  //           as: "motherBoardDetailsId",
  //         },
  //       },
  //       // {
  //       //   $lookup: {
  //       //     from: "comments",
  //       //     localField: "messageDetails",
  //       //     foreignField: "_id",
  //       //     as: "messageDetailsId",
  //       //   },
  //       // },
  //     ])
  //     .toArray();
  //   console.log(result);
  //   res.status(200);
  //   res.json(result); //send the results back as JSON
  // });

  // search by gpu, cpu, motherboard
  // app.get("/search", async (req, res) => {
  //   let result = await MongoUtil.getDB()
  //     .collection("pc")
  //     .aggregate([
  //       //

  //       {
  //         $lookup: {
  //           from: "cpu",
  //           localField: "cpuDetailsId",
  //           foreignField: "_id",
  //           as: "CPU",
  //         },
  //       },
  //       { $match: { CPU: { $project: {} } } },
  //     ])
  //     .toArray();
  //   console.log(result);
  //   console.log(result);
  //   res.status(200);
  //   res.json(result); //send the results back as JSON
  // });
  app.put("/edit/:id", async (req, res) => {
    try {
      let {
        pcCase,
        ram,
        coolingSystem,
        thermalCompund,
        SSD,
        operatingSystem,
        cpuDetailsId,
        gpuDetailsId,
        motherBoardDetailsId,
      } = req.body;
      let updatePc = {
        pcCase: pcCase,
        ram: ram,
        coolingSystem: coolingSystem,
        thermalCompund: thermalCompund,
        SSD: SSD,
        operatingSystem: operatingSystem,
        cpuDetailsId: ObjectId(cpuDetailsId),
        gpuDetailsId: ObjectId(gpuDetailsId),
        motherBoardDetailsId: ObjectId(motherBoardDetailsId),
      };
      const result = await MongoUtil.getDB()
        .collection("pc")
        .updateOne({ _id: ObjectId(req.params.id) }, { $set: updatePc });
      res.status(200, result);
      res.json({
        message: "Update success",
      });
    } catch (e) {
      res.status(500);
      res.send(e);
      console.log(e);
    }
  });
}
//search

app.get("/category", async (req, res) => {
  console.log(req.query);

  try {
    let search = {};
    if (req.query.pc) {
      search["pcCase"] = {
        $regex: req.query.pc,
        $options: "i",
      };
    }
    // if (req.query.cpu) {
    //   search["cpuDetailsId[0].model"] = {
    //     $regex: req.query.cpu,
    //     $options: "i",
    //   };
    // }
    // if (req.query.motherBoard) {
    //   search["motherBoard"] = {
    //     $regex: req.query.motherBoard,
    //     $options: "i",
    //   };
    // }
    let result = await MongoUtil.getDB()
      .collection("pc")
      .aggregate([
        {
          $match: search,
        },
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
    res.status(200, result);
    res.json(result);
    console.log(result);
  } catch (e) {
    res.status(500);
    res.send(e);
    console.log(e);
  }
});
main();

// START SERVER
app.listen(process.env.PORT || 3000, function () {
  console.log("Server has started");
});
app.get("/", function (req, res) {
  res.send("Hello");
});
