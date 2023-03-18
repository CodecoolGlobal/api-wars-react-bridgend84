import express from "express";
import axios from "axios";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {} from "dotenv/config";
import Planets from "./planets.model.js";
import People from "./people.model.js";
import Users from "./users.model.js";

const app = express();
const port = parseInt(process.env.LOCALHOST_PORT);
const SWAPI_PLANETS_URL = process.env.SWAPI_PLANETS_URL;
const SWAPI_PEOPLE_URL = process.env.SWAPI_PEOPLE_URL;
const MONGO_DB_URI = process.env.MONGO_DB_URI;
const planetsPerPages = 10;

const JWT_SECRET = process.env.JWT_SECRET;
const saltRounds = 10;

mongoose.connect(MONGO_DB_URI).then(async () => {
  const countPlanets = await mongoose.connection.db.collection('planets').countDocuments();
  const countPeople = await mongoose.connection.db.collection('people').countDocuments();
  if (countPlanets === 0) await storePlanets();
  if (countPeople === 0) await storePeople();
})

const storePlanets = async (url = SWAPI_PLANETS_URL) => {
  const response = await axios.get(url);
  const fetchedData = await response.data;
  const data = fetchedData.results.map(
    (planet) => new Object({ ...planet, votes: 0, voted: [] })
  );
  await Planets.insertMany(data);
  if (fetchedData.next) {
    await storePlanets(fetchedData.next);
  }
};

const storePeople = async (url = SWAPI_PEOPLE_URL) => {
  const response = await axios.get(url);
  const data = await response.data;
  await People.insertMany(data.results);
  if (data.next) {
    await storePeople(data.next);
  }
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/planets", async (req, res) => {
  const planets = await Planets.find();
  res.json(planets);
});

app.get("/api/planets/pages", async (req, res) => {
  const count = await Planets.countDocuments();
  res.json(Math.ceil(count / planetsPerPages));
});

app.get("/api/planets/:page", async (req, res) => {
  const count = await Planets.countDocuments();
  const pageNumber = Number(req.params.page);
  if (
    isNaN(pageNumber) ||
    pageNumber * planetsPerPages > count ||
    pageNumber === 0
  ) {
    res.sendStatus(400);
  } else {
    const planets = await Planets.find()
      .limit(planetsPerPages)
      .skip((pageNumber - 1) * planetsPerPages);
    res.json(planets);
  }
});

app.patch("/api/planets/:id", async (req, res) => {
  const planet = await Planets.findById(req.params.id);
  if (!planet) {
    res.status(404).json({ message: "not_found " });
  }
  const updatedVoted = [...planet.voted, req.body.username];
  const updatedVotes = planet.votes + 1;
  const updated = await planet
    .set({ votes: updatedVotes, voted: updatedVoted })
    .save();
  res.status(200).json(updated);
});

app.post("/api/people", async (req, res) => {
  const urls = req.body.map((residentUrl) => new Object({ url: residentUrl }));
  const residents = await People.find({ $or: urls });
  res.json(residents);
});

app.post("/register", async (req, res) => {
  const user = await Users.findOne({ username: req.body.username });
  if (user) {
    res.status(302).json({ text: "user_exist" });
  } else {
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      if (err) {
        res.status(500).end("error");
        return;
      }
      await Users.create({ username: req.body.username, password: hash });
      res.status(200).json({ text: "success" });
    });
  }
});

app.post("/login", async (req, res) => {
  const user = await Users.findOne({ username: req.body.username });
  if (!user) {
    res.status(400).json({ token: "not_found" });
  } else {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        res.status(500).json({ token: "error" });
      } else {
        if (!result) {
          res.status(401).json({ token: "bad_password" });
        } else {
          const token = jwt.sign({ id: user._id }, JWT_SECRET);
          res.status(200).json({ token: token });
        }
      }
    });
  }
});

app.get("/verify", (req, res) => {
  const header = req.headers["authorization"];
  if (header) {
    const bearer = header.split(" ");
    const token = bearer[1];
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        res.status(400).json({ message: "token_not_valid" });
      } else {
        res.status(200).json({ message: "valid_token", data: decoded });
      }
    });
  } else {
    res.status(403).json({ message: "no_token" });
  }
});

app.get("/users/:id", async (req, res) => {
  let user = null;
  try {
    user = await Users.findById(req.params.id);
  } catch {
    return res.status(400).json({ message: "error" });
  }

  if (!user) {
    return res.status(404).end({ message: "not_found" });
  }

  res.status(200).json({ message: "found", username: user.username });
});

app.listen(port, () => console.log(`http://localhost:${port}`));
