const { MongoClient } = require("mongodb");
const {
  findDatabaseAbout,
  findDatabaseProjects,
  insertMessage,
  sendMessage,
  findDatabaseByProjectId,
  findDatabaseTechStack,
} = require("./app.controller");
require("dotenv").config();

const uri = `mongodb+srv://jasonchan1201:${process.env.MONGODB_PASSWORD}@jasons-backend-portfoli.n3cirox.mongodb.net/`;

const client = new MongoClient(uri);

async function getAbout(req, res) {
  try {
    const about = await findDatabaseAbout(client);
    console.log(about);
    res.status(200).send({ about });
  } catch (e) {
    console.log(e);
  }
}

async function getProjects(req, res) {
  try {
    const projects = await findDatabaseProjects(client);

    res.status(200).send({ projects });
  } catch (e) {
    console.log(e);
  }
}

async function getProject(req, res) {
  try {
    const { id } = req.params;
    const project = await findDatabaseByProjectId(client, id);

    if (project) {
      res.status(200).send({ project });
    } else {
      throw "This project does not exist.";
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "Bad Request" });
  }
}

async function postMessage(req, res) {
  try {
    const { message, email, name } = req.body;
    const result = await insertMessage(client, message, email, name);
    res.status(201).send({ result });

    sendMessage(message, email, name);
  } catch (e) {
    console.log(e);
  }
}

async function getTechStack(req, res) {
  try {
    const techStack = await findDatabaseTechStack(client);

    res.status(200).send({ techStack });
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  getAbout,
  getProjects,
  getProject,
  postMessage,
  getTechStack,
};
