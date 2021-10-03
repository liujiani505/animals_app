/////////////////////////////////
// Import Dependencies
/////////////////////////////////
const mongoose = require("./connection");
const Animal = require("./animal")

/////////////////////////////////
// Seed Code
/////////////////////////////////
// Make sure code is not run till connected
mongoose.connection.on("open", () =>{
    const startAnimals = [
        {species: "Black Rhino", extinct: false, location: "Eastern and Southern Africa", lifeExpectancy: 35},
        {species: "Steller's Sea Cow", extinct: true, location: "Commander Islands", lifeExpectancy: 50},
        {species: "Arctic Wolf", extinct: false, location: "Queen Elizabeth Islands", lifeExpectancy: 7},
        {species: "Baiji White Dolphin", extinct: true, location: "China", lifeExpectancy: 24}
    ];
    // Delete all animals
    Animal.deleteMany({}, (err, data) =>{
        Animal.create(startAnimals, (err, data) =>{

            console.log(data);

            // close the DB connection
            mongoose.connection.close();
        })
    })
})