async function findDatabaseAbout(client) {
  const result = await client.db("portfolio").collection("about").findOne();

  if (result) {
    console.log(result);
    return result;
  } else {
    console.log("Didn't find result");
  }
}

async function findDatabaseProjects(client) {
  const result = await client.db("portfolio").collection("projects").findOne();

  if (result) {
    console.log(result);
    return result;
  } else {
    console.log("Didn't find result");
  }
}

async function sendMessage(client, message, email) {
  const emailObj = { email };
  const messageObj = { message };

  const insertedEmail = await client
    .db("portfolio")
    .collection("contact")
    .insertOne(emailObj);

  const insertedMessage = await client
    .db("portfolio")
    .collection("contact")
    .insertOne(messageObj);

  if (insertedEmail.insertedId && insertedMessage.insertedId) {
    console.log(
      "New data added with the following id ",
      insertedEmail.insertedId,
      insertedMessage.insertedId
    );

    const messageResult = await client
      .db("portfolio")
      .collection("contact")
      .findOne(messageObj);

    const emailResult = await client
      .db("portfolio")
      .collection("contact")
      .findOne(emailObj);

    return { messageResult, emailResult };
  } else {
    console.log("Failed to retrieve inserted documents");
  }
}

module.exports = { findDatabaseAbout, findDatabaseProjects, sendMessage };
