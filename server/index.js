const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const userRoutes = require("./routes/user");
const fileRoutes = require("./routes/file");
const morgan = require('morgan')
const path = require('path')
const cors = require('cors');

// Connecting to MongoDB database
mongoose
.connect(process.env.DB_CONNECTION+process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => {
  console.log('Connected to database!')
  
  const app = express()
  app.use(cors()) // enabling cors for all origins should be avoided - TODO: add a specific origin
  // registering middleware
  app.use(bodyParser.urlencoded({extended: true}));
  app.use('/scripts', express.static(path.join(__dirname, './node_modules')));

  // logging using morgan
  app.use(morgan('dev'));

  // registering routes
  app.use(userRoutes);
  app.use(fileRoutes);

  // starting the server
  const port = process.env.PORT || 5000

  app.listen(port, () => {
    console.log(`Server has started on port: ${port}`)
  })
})
.catch(error => {
  console.error(error)
})