/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")


/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(DATABASE_URL, CONFIG)
mongoose.connection
.on("open", () => console.log("Connected to Mongo"))
.on("close", () => console.log("Disconnected from Mongo"))
.on("error", (error) => console.log("error"))


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


/////////////////////////////////////////////////
// Create Express Application Object
/////////////////////////////////////////////////
const app = express()


//////////////////////////////////////////////////
// Middleware
//////////////////////////////////////////////////
app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))


///////////////////////////////////////////////////
// Routes
///////////////////////////////////////////////////
app.get("/", (req, res) => {
    res.send("your server is running... better catch it.")
})

// Seed Route
app.get("/animals/seed", (req, res) => {
    const startAnimals = [
        {species: "Black Rhino", extinct: false, location: "Eastern and Southern Africa", lifeExpectancy: 35},
        {species: "Steller's Sea Cow", extinct: true, location: "Commander Islands", lifeExpectancy: 50},
        {species: "Arctic Wolf", extinct: false, location: "Queen Elizabeth Islands", lifeExpectancy: 7},
        {species: "Baiji White Dolphin", extinct: true, location: "China", lifeExpectancy: 24}
    ]
    // Delete all animals
    Animal.remove({}, (err, data) => {
        // Seed Starter Animals
        Animal.create(startAnimals, (err, data) => {
            // send created animals as response to confirm creation
            res.json(data);
        })
    })
})

// Index Route
//callback method
app.get("/animals", (req, res) => {
    Animal.find({}, (err, animals) => {
        res.render("animals/index.ejs", { animals })
    });
});
// .then method
// app.get("/animals", (req, res) => {
//     Animal.find({})
//     .then((animals) => {
//         res.render("animals/index.ejs", {animals})
//     });
// });
//  async/await method
// app.get("/animals", async (req, res) => {
//     const animals = await Animal.find({});
//     res.render("animals/index.ejs", { animals });
// })

// New Route
app.get("/animals/new", (req, res) => {
    res.render("animals/new.ejs")
})

// Destroy Route
app.delete("/animals/:id", (req, res) => {
    const id = req.params.id;
    Animal.findByIdAndRemove(id, (err, animal) => {
        // if(err) res.json({err});
        res.redirect("/animals")
    })
})

// Update Route
app.put("/animals/:id", (req, res) => {
    const id = req.params.id;
    req.body.species = req.body.species;
    req.body.extinct= req.body.extinct;
    Animal.findByIdAndUpdate(id, req.body, {new: true}, (err, animal) => {
        res.redirect("/animals")
    })
})

// Create Route
app.post("/animals", (req, res) => {
    req.body.species = req.body.species;
    req.body.extinct= req.body.extinct;
    Animal.create(req.body, (err, fruit) => {
        res.redirect("/animals")
    })
})

// Edit Route
app.get("/animals/:id/edit", (req, res) => {
    const id = req.params.id;
    Animal.findById(id, (err, animal) => {
        res.render("animals/edit.ejs", {animal})
    })
})


// Show Route
app.get("/animals/:id", (req, res) => {
    const id = req.params.id;
    // find the particular fruit from the database
    Animal.findById(id,(err, animal) => {
        res.render("animals/show.ejs", {animal})
    })
})

///////////////////////////////////////////////////
// Server Listener
///////////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))


