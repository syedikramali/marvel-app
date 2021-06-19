require("dotenv").config();
const config = require("./config");
const marvel = require("./marvel/marvel");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Welcome to Marvel Characters API's"));
app.get("/characters", marvel.getAllCharactersIds);
app.get("/characters/:id", marvel.getCharacter);

// route not found
app.use((req, res, next) => {
  res.send(404).send("Sorry cant find that!");
});

if (config.port) {
  app.listen(config.port, function() {
    console.log(`The app running on port ${config.port}`);
  });
} else {
  console.error("PORT number not defined, please add all required config keys");
  process.exit();
}

module.exports = app;
