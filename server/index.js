const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const userRoutes = require("./routes/user");

// Connecting to MongoDB database
mongoose
.connect("mongodb://localhost:27017/instashare", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => {
  const app = express()
  app.use(userRoutes);

  app.listen(5000, () => {
    console.log("Server has started!")
  })
})
.catch(error => {
  console.log(error)
})