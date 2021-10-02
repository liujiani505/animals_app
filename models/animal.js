////////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////////
const mongoose = require("./connection")

////////////////////////////////////////////////
// Create Models
////////////////////////////////////////////////
const {Schema, model} = mongoose
const animalSchema = new Schema({
    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number
})
const Animal = model("Animal", animalSchema)

module.exports = Animal;