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

app.get("/about", async (req, res) => {
  try {
    await client.connect();
    const about = await findDatabaseAbout(client);
    console.log(about);
    res.status(200).send({ about });
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
});

app.get("/projects", async (req, res) => {
  try {
    await client.connect();
    const projects = await findDatabaseProjects(client);

    res.status(200).send({ projects });
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
});

app.get("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await client.connect();
    const project = await findDatabaseByProjectId(client, id);

    res.status(200).send({ project });
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
});

app.get("/techStack", async (req, res) => {
  try {
    await client.connect();
    const techStack = await findDatabaseTechStack(client);

    res.status(200).send({ techStack });
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
});

app.post("/contact", async (req, res) => {
  try {
    const { message, email, name } = req.body;

    await client.connect();
    const result = await insertMessage(client, message, email, name);
    res.status(201).send({ result });

    sendMessage(message, email, name);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
});

app.listen(9090, () => {
  console.log(`Server is listening on port ${port}`);
});
