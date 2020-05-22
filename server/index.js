const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes")
const bodyParser = require("body-parser")

// Connecting to MongoDB database
mongoose
.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  const app = express()
  app.use(bodyParser.json())
  app.use("/api", routes)

  app.listen(5000, () => {
    console.log("Server has started!")
  })
})