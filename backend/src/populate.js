import axios from "axios";
import mongoose from "mongoose";
import {} from "dotenv/config";
import Planets from "./planets.model.js";
import People from "./people.model.js";

const SWAPI_PLANETS_URL = process.env.SWAPI_PLANETS_URL;
const SWAPI_PEOPLE_URL = process.env.SWAPI_PEOPLE_URL;
const MONGO_DB_URI = process.env.MONGO_DB_URI;

const populateData = async () => {
  await Planets.deleteMany({});
  await People.deleteMany({});
  await storePlanets();
  await storePeople();
};

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

mongoose.connect(MONGO_DB_URI)
  .then(populateData)
  .then(() => mongoose.disconnect());