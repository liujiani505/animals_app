/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const AnimalRouter = require("./controllers/animal")
const UserRouter = require("./controllers/user")

/////////////////////////////////////////////////
// Create Express Application Object
/////////////////////////////////////////////////
const app = express();


////////////////////////////////////////////////
// Middleware
////////////////////////////////////////////////
app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use("/animals", AnimalRouter)
app.use("/user", UserRouter)

///////////////////////////////////////////////////
// Initial Route
///////////////////////////////////////////////////
app.get("/", (req, res) => {
    res.send("your server is running... better catch it.")
})


///////////////////////////////////////////////////
// Server Listener
///////////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))


