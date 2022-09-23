import mongoose from "mongoose";

const planetsSchema = new mongoose.Schema({
  name: String,
      rotation_period: String,
      orbital_period: String,
      diameter: String,
      climate: String,
      gravity: String,
      terrain: String,
      surface_water: String,
      population: String,
      residents: Array,
      films: Array,
      created: Date,
      edited: Date,
      url: String
});

export default mongoose.model("planets", planetsSchema);