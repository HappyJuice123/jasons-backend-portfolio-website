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
      const res = await request(app).get("/projects/5");

      expect(res.status).toBe(400);
    });
  });
});
