const { MongoClient } = require("mongodb");
const express = require("express");
const {
  findDatabaseAbout,
  findDatabaseProjects,
  sendMessage,
} = require("./app.controller");

const app = express();
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
    console.log(projects);
    res.status(200).send({ projects });
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
});

app.post("/contact", async (req, res) => {
  try {
    const { message, email } = req.body;

    await client.connect();
    const result = await sendMessage(client, message, email);
    res.status(201).send({ result });
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
});

app.listen(9090, () => {
  console.log(`Server is listening on port ${port}`);
});
