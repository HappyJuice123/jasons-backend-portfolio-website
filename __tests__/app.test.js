const request = require("supertest");
const app = require("../app");

const { MongoClient } = require("mongodb");

describe("App Tests", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  describe("insert documents", () => {
    test("should insert a doc into the about collection", async () => {
      const users = db.collection("about");

      const mockAbout = {
        name: "Jason Chan",
        home: "Hello and a warm welcome to my portfolio website!",
        description: "Hi, I'm Jason!",
        linkedin: "https://www.linkedin.com/in/jason-chan-/",
        github: "https://github.com/HappyJuice123",
        email: "jasonchan1201@gmail.com",
        timeline: [
          {
            id: 1,
            title: "Northcoders - Junior Full Stack Developer",
            location: "Manchester, UK",
            description: "I successfully completed Northcoders.",
            buttonText: "Company Website",
            date: "January 2023 - April 2023",
            icon: "work",
          },
          {
            id: 2,
            title: "Arcadis - Assistant Civil Engineer",
            location: "Warrington, UK",
            description: "As a Designer for HS2.",
            buttonText: "Company Website",
            date: "October 2018 - December 2022",
            icon: "work",
          },
        ],
      };

      await users.insertOne(mockAbout);

      const insertedAbout = await users.findOne({});
      expect(insertedAbout).toEqual(mockAbout);
    });

    test("should insert a doc into the projects collection", async () => {
      const projects = db.collection("projects");

      const mockProjects = [
        {
          id: 1,
          name: "Board Game Review Front End",
          github: "https://github.com/HappyJuice123/fe-nc-games-project",
          host: "https://jasons-board-game-reviews.netlify.app/",
          techStack: ["JavaScript", "React", "Axios", "CSS"],
          description: "Designed and developed a front end.",
          img: "1W43LknODiZ6C1SHBUJmsLOEp6ZtP3sSY",
        },

        {
          id: 2,
          name: "Board Game Review API",
          github:
            "https://github.com/HappyJuice123/backend-portfolio-project-NC",
          host: "https://jasons-backend-games-project.onrender.com",
          techStack: [
            "JavaScript",
            "Express",
            "Jest",
            "PostgreSQL",
            "SuperTest",
          ],
          description:
            "The project involved building a relational database API.",
          img: "1-YiHfnwOCg53_lqV79_0uUiulIy2M6G5",
        },
      ];

      await projects.insertMany(mockProjects);

      const insertedProjects = await projects.find({}).toArray();
      expect(insertedProjects).toEqual(mockProjects);
    });

    test("should insert a doc into the techStack collection", async () => {
      const techStack = db.collection("techStack");

      const mockTechStack = {
        JavaScript: 1,
        MongoDB: 1,
        Firebase: 1,
        HTML: 1,
        CSS: 1,
        PostgreSQL: 1,
        Expo: 1,
        Jest: 1,
        React: 1,
        "React Native": 1,
        Tailwind: 1,
        Axios: 1,
        Express: 1,
        "Node.js": 1,
        Bootstrap: 1,
        NativeWind: 1,
      };

      await techStack.insertOne(mockTechStack);

      const insertedTeckStack = await techStack.findOne();

      expect(insertedTeckStack).toEqual(mockTechStack);
    });
  });

  describe("/about", () => {
    test("200: GET - responds with about object", async () => {
      const about = db.collection("about");

      const findAbout = await about.findOne();
      expect(findAbout).toMatchObject({
        _id: expect.any(Object),
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
    test("200: GET - responds with projects object", async () => {
      const projects = db.collection("projects");

      const findProjects = await projects.findOne();

      expect(findProjects.projects).toHaveLength(2);
      findProjects.projects.map((project) => {
        expect(project).toMatchObject({
          id: expect.any(Number),
          name: expect.any(String),
          github: expect.any(String),
          host: expect.any(String),
          techStack: expect.any(Object),
          description: expect.any(String),
          img: expect.any(String),
        });
      });
    });
  });
  describe("/projects/:id", () => {
    test("200: GET - responds with a single project", async () => {
      const projects = db.collection("projects");

      const findSingleProject = await projects.findOne({ "projects.id": 1 });

      expect(findSingleProject).toEqual({});
    });
  });
});
