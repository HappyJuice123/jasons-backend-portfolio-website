const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const express = require("express");

const {
  getAbout,
  getProjects,
  getProject,
  postMessage,
  getTechStack,
} = require("./controller/app.controller");

const { handle404 } = require("./controller/error-handling.controller");

const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://jasonchan1201:${process.env.MONGODB_PASSWORD}@jasons-backend-portfoli.n3cirox.mongodb.net/`;

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
  } catch (e) {
    console.log(e);
  }
}

connectToDatabase();

app.get("/about", getAbout);

app.get("/projects", getProjects);

app.get("/projects/:id", getProject);

app.get("/techStack", getTechStack);

app.post("/contact", postMessage);

app.use(handle404);

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

module.exports = app;
