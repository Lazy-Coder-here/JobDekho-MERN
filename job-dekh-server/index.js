import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors());

import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@job-dekho-mern.ngpr8vr.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // create db
    const database = client.db("JobDekho");
    const jobsCollection = database.collection("jobsCollection");

    // post a job
    app.post("/post-job", async (req, res) => {
      const data = req.body;
      data.createdAt = new Date();
      const result = await jobsCollection.insertOne(data);
      if (result.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({
          message: "can not insert! try again later",
          status: false,
        });
      }
    });

    // get all jobs
    app.get("/all-jobs", async (req, res) => {
      const jobs = await jobsCollection.find().toArray();
      res.send(jobs);
    });

    // get single job using id
    app.get("/all-jobs/:id", async (req, res) => {
      const { id } = req.params;
      const job = await jobsCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(job);
    });

    // get jobs by email
    app.get("/myJobs/:email", async (req, res) => {
      const { email } = req.params;
      const jobs = await jobsCollection.find({ postedBy: email }).toArray();
      res.send(jobs);
    });

    // delete a job
    app.delete("/myJobs/:id", async (req, res) => {
      const { id } = req.params;
      const filter = { _id: new ObjectId(id) };
      const result = await jobsCollection.deleteOne(filter);
      res.send(result);
    });

    // update a job
    app.patch("/update-job/:id", async (req, res) => {
      const { id } = req.params;
      const jobData = req.body;
      const filter = { _id: new ObjectId(id) };
      // const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...jobData,
        },
      };
      const result = await jobsCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello Rahul!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
