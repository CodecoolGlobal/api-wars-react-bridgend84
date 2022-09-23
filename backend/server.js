import express from "express";
import axios from "axios";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Planets from "./planets.model.js";
import People from "./people.model.js";
import Users from "./users.model.js";

const app = express();
const port = 8080;
const SWAPI_PLANETS_URL = "https://swapi.dev/api/planets/";
const SWAPI_PEOPLE_URL = "https://swapi.dev/api/people/";
const planetsPerPages = 10;

const JWT_SECRET = "prince_of_the_highlands_never_think_of_anyone_else";
const saltRounds = 10;

mongoose.connect("mongodb://localhost/api_wars_data");

const storePlanets = async (url = SWAPI_PLANETS_URL) => {
  const response = await axios.get(url);
  const data = await response.data;
  await Planets.insertMany(data.results);
  if (data.next) {
    storePlanets(data.next);
  } else return;
};

const storePeople = async (url = SWAPI_PEOPLE_URL) => {
  const response = await axios.get(url);
  const data = await response.data;
  await People.insertMany(data.results);
  if (data.next) {
    storePeople(data.next);
  } else return;
};

storePlanets();
storePeople();

const checkPassword = async (pw, hash) => {
  bcrypt.compare(pw, hash, (err, result) => {
    if (err) {
      throw err;
    }
    return result;
  });
};

const makeToken = async (id) => {
  const token = jwt.sign({ id: id }, JWT_SECRET);
  return token;
};

const verifyToken = async (token) => {
  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) throw err;
    return decoded;
  });
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.post("/api/people", async (req, res) => {
  const urls = req.body.map((residentUrl) => new Object({ url: residentUrl }));
  const residents = await People.find({ $or: urls });
  res.json(residents);
});

app.post("/register", async (req, res) => {
  const user = await Users.find({ username: req.body.username });
  if (user.length > 0) {
    res.sendStatus(400);
  } else {
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      if (err) {
        res.sendStatus(500);
      }
      await Users.create({ username: req.body.username, password: hash });
      res.sendStatus(200);
    });
  }
});

app.listen(port, () => console.log(`http://localhost:${port}`));
