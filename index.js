// This file sets up the entire project.  It sets up the user session details.  Will use the proper port for Heroku if it's there, otherwise port 3001.  It requires the express middleware and routes.  It also puts a listener on the port.
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});