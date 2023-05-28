const { MongoClient } = require("mongodb");

async function main() {
  const uri =
    "mongodb+srv://jasonchan1201:jYXCCIQOIDL95fXl@jasons-backend-portfoli.n3cirox.mongodb.net/";

  const client = new MongoClient(uri);

  try {
    await client.connect();
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
