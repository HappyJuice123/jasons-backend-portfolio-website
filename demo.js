const { MongoClient } = require("mongodb");

const data = require("../backend-portfolio/data/personal-information.json");

async function main() {
  const uri =
    "mongodb+srv://jasonchan1201:jYXCCIQOIDL95fXl@jasons-backend-portfoli.n3cirox.mongodb.net/";

  const client = new MongoClient(uri);

  try {
    await client.connect();
    await deleteDatabase(client);
    await createDatabase(client);
    await findDatabase(client);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

async function createDatabase(client) {
  const result = await client
    .db("portfolio")
    .collection("personal-information")
    .insertOne(data);

  console.log("New data added with the following id ", result.insertedId);
}

async function findDatabase(client) {
  const result = await client
    .db("portfolio")
    .collection("personal-information")
    .find();

  if (result) {
    return result.forEach((answer) => console.log(answer));
  } else {
    console.log("Didn't find result");
  }
}

async function deleteDatabase(client) {
  const result = await client
    .db("portfolio")
    .collection("personal-information")
    .deleteOne();

  console.log(`${result.deletedCount} document(s) was deleted`);
}

main().catch(console.error);
