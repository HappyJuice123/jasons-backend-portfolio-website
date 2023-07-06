const request = require("supertest");
const app = require("../app");
require("dotenv").config();

const { MongoClient } = require("mongodb");

describe("App Test", () => {
  const uri = `mongodb+srv://jasonchan1201:${process.env.MONGODB_PASSWORD}@jasons-backend-portfoli.n3cirox.mongodb.net/`;

  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db("portfolio");
  });

  afterAll(async () => {
    await connection.close();
  });

  describe("/about", () => {
    test("200: responds with about object", async () => {
      const res = await request(app).get("/about");

      expect(res.status).toBe(200);
      expect(res["_body"].about).toMatchObject({
        _id: expect.any(String),
        name: expect.any(String),
        home: expect.any(String),
        description: expect.any(String),
        linkedin: expect.any(String),
        github: expect.any(String),
        email: expect.any(String),
        timeline: expect.any(Object),
      });
    });
  });
  describe("/projects", () => {
    test("200 - responds with projects object", async () => {
      const res = await request(app).get("/projects");
      expect(res.status).toBe(200);
      res["_body"].projects.map((project) => {
        expect(project).toMatchObject({
          _id: expect.any(String),
          id: expect.any(Number),
          name: expect.any(String),
          github: expect.any(String),
          techStack: expect.any(Object),
          description: expect.any(String),
          img: expect.any(String),
        });
      });
    });
  });
  describe("/projects/:id", () => {
    test("200 - responds with a single project", async () => {
      const res = await request(app).get("/projects/1");

      expect(res.status).toBe(200);

      expect(res["_body"].project).toMatchObject({
        _id: expect.any(String),
        id: 1,
        name: expect.any(String),
        github: expect.any(String),
        host: expect.any(String),
        techStack: expect.any(Object),
        description: expect.any(String),
        img: expect.any(String),
      });
    });

    test("400 - responds with bad request when given an invalid id", async () => {
      const res = await request(app).get("/projects/555");

      expect(res.status).toBe(400);
      expect(res["_body"].msg).toBe("Bad Request");
    });
  });
  describe("/techStack", () => {
    test("200 - responds with techStack object", async () => {
      const res = await request(app).get("/techStack");

      expect(res.status).toBe(200);
      expect(res["_body"].techStack).toMatchObject({
        _id: expect.any(String),
        JavaScript: expect.any(Number),
        MongoDB: expect.any(Number),
        Firebase: expect.any(Number),
        HTML: expect.any(Number),
        CSS: expect.any(Number),
        PostgreSQL: expect.any(Number),
        Expo: expect.any(Number),
        Jest: expect.any(Number),
        React: expect.any(Number),
        "React Native": expect.any(Number),
        Tailwind: expect.any(Number),
        Axios: expect.any(Number),
        Express: expect.any(Number),
        "Node.js": expect.any(Number),
        Bootstrap: expect.any(Number),
        NativeWind: expect.any(Number),
      });
    });
  });
  describe("/contact", () => {
    test("201 - responds with the posted message, email and name", async () => {
      const addMessage = {
        name: "Jake",
        email: "testing@example.com",
        message: "Hello, my friend!",
      };

      const res = await request(app).post("/contact").send(addMessage);

      expect(res.status).toBe(201);
      expect(res["_body"].result.emailResult.email).toBe("testing@example.com");
      expect(res["_body"].result.nameResult.name).toBe("Jake");
      expect(res["_body"].result.messageResult.message).toBe(
        "Hello, my friend!"
      );
    });
    test("400 - responds with Bad Request when given a missing message", async () => {
      const addMessage = {
        name: "Jake",
        email: "testing@example.com",
      };

      const res = await request(app).post("/contact").send(addMessage);

      expect(res.status).toBe(400);
      expect(res["_body"].msg).toBe("Error - All fields are required.");
    });
    test("400 - responds with Bad Request when given a missing email", async () => {
      const addMessage = {
        name: "Jake",
        message: "Hello my friend!",
      };

      const res = await request(app).post("/contact").send(addMessage);

      expect(res.status).toBe(400);
      expect(res["_body"].msg).toBe("Error - All fields are required.");
    });
    test("400 - responds with Bad Request when given a missing name", async () => {
      const addMessage = {
        email: "testing@example.com",
        message: "Hello my friend!",
      };

      const res = await request(app).post("/contact").send(addMessage);

      expect(res.status).toBe(400);
      expect(res["_body"].msg).toBe("Error - All fields are required.");
    });
  });
  describe("/notAPath", () => {
    test("404 - responds with a Not Found", async () => {
      const res = await request(app).get("/notAPath");

      console.log(res);

      expect(res.status).toBe(404);
      expect(res["_body"].msg).toBe("Error 404 - Not Found");
    });
  });
  describe("/api", () => {
    test("200 - responds with object endpoints", async () => {
      const res = await request(app).get("/api");

      expect(res.status).toBe(200);
      expect(res["_body"].endpoints.endpoints).toMatchObject({
        "GET /projects/:id": expect.any(Object),
        "GET /about": expect.any(Object),
        "GET /projects": expect.any(Object),
        "GET /techStack": expect.any(Object),
        "POST /contact": expect.any(Object),
      });
    });
  });
});
