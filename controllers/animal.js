/////////////////////////////////////////////////
// Import Dependencies
/////////////////////////////////////////////////
const express = require("express")
const Animal = require("../models/animal")

/////////////////////////////////////////////////
// Create Route
/////////////////////////////////////////////////

const router = express.Router()

/////////////////////////////////////////////////
// router middleware
/////////////////////////////////////////////////
// Authorization Middleware
router.use((req, res, next) => {
    if(req.session.loggedIn) {
        next();
    } else {
        res.redirect("/user/login")
    }
})


/////////////////////////////////////////////////
// Routes
/////////////////////////////////////////////////

// Seed Route
// router.get("/seed", (req, res) => {
//     const startAnimals = [
//         {species: "Black Rhino", extinct: false, location: "Eastern and Southern Africa", lifeExpectancy: 35},
//         {species: "Steller's Sea Cow", extinct: true, location: "Commander Islands", lifeExpectancy: 50},
//         {species: "Arctic Wolf", extinct: false, location: "Queen Elizabeth Islands", lifeExpectancy: 7},
//         {species: "Baiji White Dolphin", extinct: true, location: "China", lifeExpectancy: 24}
//     ]
//     // Delete all animals
//     Animal.remove({}, (err, data) => {
//         // Seed Starter Animals
//         Animal.create(startAnimals, (err, data) => {
//             // send created animals as response to confirm creation
//             res.json(data);
//         })
//     })
// })

// Index Route
//callback method
router.get("/", (req, res) => {
    Animal.find({username: req.session.username}, (err, animals) => {
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
router.get("/new", (req, res) => {
    res.render("animals/new.ejs")
})

// Destroy Route
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Animal.findByIdAndRemove(id, (err, animal) => {
        // if(err) res.json({err});
        res.redirect("/animals")
    })
})

// Update Route
router.put("/:id", (req, res) => {
    const id = req.params.id;
    req.body.species = req.body.species;
    req.body.extinct= req.body.extinct;
    Animal.findByIdAndUpdate(id, req.body, {new: true}, (err, animal) => {
        res.redirect("/animals")
    })
})

// Create Route
router.post("/", (req, res) => {
    req.body.species = req.body.species;
    req.body.extinct= req.body.extinct;
    // add the username to the req.body
    req.body.username = req.session.username;
    Animal.create(req.body, (err, fruit) => {
        res.redirect("/animals")
    })
})

// Edit Route
router.get("/:id/edit", (req, res) => {
    const id = req.params.id;
    Animal.findById(id, (err, animal) => {
        res.render("animals/edit.ejs", {animal})
    })
})


// Show Route
router.get("/:id", (req, res) => {
    const id = req.params.id;
    // find the particular fruit from the database
    Animal.findById(id,(err, animal) => {
        res.render("animals/show.ejs", {animal})
    })
})


/////////////////////////////////////////////////
// Export the router
/////////////////////////////////////////////////
module.exports = router;