const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from MW server!");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6ayglwi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const db = client.db("simple_task1");
    const workingSectorCollection = db.collection("workingSector");
    const userInfosCollection = db.collection("user-infos");

    app.get("/api/v1/sectors", async (req, res) => {
      const sectors = await workingSectorCollection.find().toArray();

      res.status(200).json(sectors);
    });

    app.post("/api/v1/user-infos", async (req, res) => {
      const newInfo = req.body;
      const result = await userInfosCollection.insertOne(newInfo);
      newInfo._id = result.insertedId;

      res.status(201).json(newInfo);
    });

    app.get("/api/v1/user-infos", async (req, res) => {
      const userInfos = await userInfosCollection.find().toArray();

      res.status(200).json(userInfos);
    });

    app.delete("/api/v1/user-infos/:id", async (req, res) => {
      const id = req.params.id;
      const result = await userInfosCollection.deleteOne({ _id: ObjectId(id) });

      res.status(200).json(result);
    });

    app.patch("/api/v1/user-infos/:id", async (req, res) => {
      const id = req.params.id;
      const updateInfo = req.body;
      const filter = { _id: ObjectId(id) };

      const updateDoc = {
        $set: updateInfo,
      };

      const result = await userInfosCollection.updateOne(filter, updateDoc);

      res.status(200).json(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
