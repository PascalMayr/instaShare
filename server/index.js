const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes")
const bodyParser = require("body-parser")
const userRouter = require("./routes/user");

// Connecting to MongoDB database
mongoose
.connect("mongodb://localhost:27017/instashare", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => {
  const app = express()
  app.use(bodyParser.json())
  app.use("/users", userRouter);

  app.listen(5000, () => {
    console.log("Server has started!")
  })
})