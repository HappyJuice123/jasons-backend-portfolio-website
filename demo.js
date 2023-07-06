const { MongoClient } = require("mongodb");

const about = require("./data/about.json");
const projects = require("./data/projects.json");
const techStack = require("./data/techStack.json");
const endpoints = require("./data/endpoints.json");

async function main() {
  const uri =
    "mongodb+srv://jasonchan1201:jYXCCIQOIDL95fXl@jasons-backend-portfoli.n3cirox.mongodb.net/";

  const client = new MongoClient(uri);

  try {
    await client.connect();
    await deleteDatabaseAbout(client);
    await deleteDatabaseProjects(client);
    await deleteDatabaseTechStack(client);
    await deleteDatabaseEndpoints(client);

    await createDatabaseAbout(client);
    await createDatabaseProjects(client);
    await createDatabaseTechStack(client);
    await createDatabaseEndpoints(client);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

async function createDatabaseAbout(client) {
  const result = await client
    .db("portfolio")
    .collection("about")
    .insertOne(about);

  console.log("New data added with the following id ", result.insertedId);
}

async function createDatabaseProjects(client) {
  const result = await client
    .db("portfolio")
    .collection("projects")
    .insertMany(projects);

  console.log("New data added with the following id ", result.insertedIds);
}

async function createDatabaseTechStack(client) {
  const result = await client
    .db("portfolio")
    .collection("techStack")
    .insertOne(techStack);

  console.log("New data added with the following id ", result.insertedId);
}

async function createDatabaseEndpoints(client) {
  const result = await client
    .db("portfolio")
    .collection("endpoints")
    .insertOne(endpoints);

  console.log("New data added with the following id ", result.insertedId);
}

async function deleteDatabaseAbout(client) {
  const result = await client.db("portfolio").collection("about").deleteOne();

  console.log(`${result.deletedCount} document(s) was deleted`);
}

async function deleteDatabaseProjects(client) {
  const result = await client
    .db("portfolio")
    .collection("projects")
    .deleteMany({});

  console.log(`${result.deletedCount} document(s) was deleted`);
}

async function deleteDatabaseTechStack(client) {
  const result = await client
    .db("portfolio")
    .collection("techStack")
    .deleteOne();

  console.log(`${result.deletedCount} document(s) was deleted`);
}

async function deleteDatabaseEndpoints(client) {
  const result = await client
    .db("portfolio")
    .collection("endpoints")
    .deleteOne();

  console.log(`${result.deletedCount} document(s) was deleted`);
}

main().catch(console.error);
