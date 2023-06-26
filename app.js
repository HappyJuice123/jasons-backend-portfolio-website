const { MongoClient } = require("mongodb");
const cors = require("cors");

const express = require("express");
const {
  findDatabaseAbout,
  findDatabaseProjects,
  insertMessage,
  sendMessage,
  findDatabaseByProjectId,
  findDatabaseTechStack,
} = require("./app.controller");

const app = express();
app.use(cors());
app.use(express.json());

const port = 9090;

const uri =
  "mongodb+srv://jasonchan1201:jYXCCIQOIDL95fXl@jasons-backend-portfoli.n3cirox.mongodb.net/";

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to Database");
  } catch (e) {
    console.log(e);
  }
}

connectToDatabase();

app.get("/about", async (req, res) => {
  try {
    const about = await findDatabaseAbout(client);
    console.log(about);
    res.status(200).send({ about });
  } catch (e) {
    console.log(e);
  }
});

app.get("/projects", async (req, res) => {
  try {
    const projects = await findDatabaseProjects(client);

    res.status(200).send({ projects });
  } catch (e) {
    console.log(e);
  }
});

app.get("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await findDatabaseByProjectId(client, id);

    res.status(200).send({ project });
  } catch (e) {
    console.log(e);
  }
});

app.get("/techStack", async (req, res) => {
  try {
    const techStack = await findDatabaseTechStack(client);

    res.status(200).send({ techStack });
  } catch (e) {
    console.log(e);
  }
});

app.post("/contact", async (req, res) => {
  try {
    const { message, email, name } = req.body;
    const result = await insertMessage(client, message, email, name);
    res.status(201).send({ result });

    sendMessage(message, email, name);
  } catch (e) {
    console.log(e);
  }
});

async function closeMongoDBConnection() {
  try {
    await client.close();
  } catch (e) {
    console.log(e);
  }
}

function cleanup() {
  closeMongoDBConnection().finally(() => {
    process.exit(0);
  });
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

app.listen(9090, () => {
  console.log(`Server is listening on port ${port}`);
});
