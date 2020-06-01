const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const fileRoutes = require("./routes/file");
const appRoutes = require("./routes/app");
const morgan = require('morgan');
const cors = require('cors');
const chalk = require('chalk');

// Connecting to MongoDB database
mongoose
.connect(process.env.DB_CONNECTION+process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => {
  console.log(chalk.magenta('Connected to database!'))
  
  const app = express()
  //if(process.env.NODE_ENV === 'development')
  app.use(cors()) // enabling cors for all origins should be avoided - TODO: add a specific origin
  // registering middleware
  app.use(bodyParser.urlencoded({extended: true}));
  // logging using morgan
  app.use(morgan('dev'));

  // registering routes
  app.use(userRoutes);
  app.use(fileRoutes);
  app.use(appRoutes);

  // starting the server
  const port = process.env.PORT || 5000

  app.listen(port, () => {
    console.log(chalk.green(`Server has started on port: ${port}`))
  })
})
.catch(error => {
  console.log(chalk.red('Could not connect to the database!'))
  console.error(error)
})