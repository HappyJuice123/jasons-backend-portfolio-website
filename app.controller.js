const nodemailer = require("nodemailer");
require("dotenv").config();

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

async function findDatabaseByProjectId(client, id) {
  const result = await client.db("portfolio").collection("projects").findOne();

  if (result) {
    return result.projects.find((project) => project.id === +id);
  } else {
    console.log("Didn't find result");
  }
}

async function insertMessage(client, message, email, name) {
  const emailObj = { email };
  const messageObj = { message };
  const nameObj = { name };

  const insertedEmail = await client
    .db("portfolio")
    .collection("contact")
    .insertOne(emailObj);

  const insertedMessage = await client
    .db("portfolio")
    .collection("contact")
    .insertOne(messageObj);

  const insertedName = await client
    .db("portfolio")
    .collection("contact")
    .insertOne(nameObj);

  if (
    insertedEmail.insertedId &&
    insertedMessage.insertedId &&
    insertedName.insertedId
  ) {
    console.log(
      "New data added with the following id ",
      "Email >",
      insertedEmail.insertedId,
      "Message >",
      insertedMessage.insertedId,
      "Name >",
      insertedName.insertedId
    );

    const messageResult = await client
      .db("portfolio")
      .collection("contact")
      .findOne(messageObj);

    const emailResult = await client
      .db("portfolio")
      .collection("contact")
      .findOne(emailObj);

    const nameResult = await client
      .db("portfolio")
      .collection("contact")
      .findOne(nameObj);

    return { messageResult, emailResult, nameResult };
  } else {
    console.log("Failed to retrieve inserted documents");
  }
}

console.log(process.env.EMAIL_PASSWORD);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "jasonchan1201@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendMessage(message, email, name) {
  const mailOptions = {
    from: "jasonchan1201@gmail.com",
    to: email,
    subject:
      "*AUTOMATED* Jason Chan's Portfolio Website - Your message has been received!",
    text: `
    Hi ${name},\n
    Thank you for sending me a message!\n
    Your details below has been sent to me and I will return your message as soon as I can!\n
    Email: ${email}\n
    Message: ${message}\n
    Kind regards,\n
    Jason`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent:", info.response);
      sendNotificationEmail(name, email, message);
      res.status(200).send("Email sent successfully");
    }
  });
}

function sendNotificationEmail(name, email, message) {
  const mailOptions = {
    from: "jasonchan1201@gmail.com",
    to: "jasonchan1201@gmail.com",
    subject: "Jason Chan Portfolio Website - New Message Notification",
    text: `You have received a new message from your website:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending notification email:", error);
    } else {
      console.log("Notification email sent:", info.response);
    }
  });
}

module.exports = {
  findDatabaseAbout,
  findDatabaseProjects,
  insertMessage,
  sendMessage,
  findDatabaseByProjectId,
};
