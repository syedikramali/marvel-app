const axios = require("../modules/axios");
const redis = require("../modules/redisManager");
const { LAST_FETCHED_DATE_ALL, ALL_CHARACTERS_KEY } = require("./constants");
const service = require("./service");

const getAllCharactersIds = async (req, res) => {
  try {
    const allCacheChar = await redis.getAsync(ALL_CHARACTERS_KEY);
    const lastFetchedDate = await redis.getAsync(LAST_FETCHED_DATE_ALL);
    // const allCacheChar = "";
    // const lastFetchedDate = "";
    console.log(">> lastFetchedDate", lastFetchedDate);
    if (!allCacheChar && !lastFetchedDate) {
      // first time when API gets calls
      const resp = await service.fetchFirstHundrdCharacters();
      const { data, code, status } = resp;
      const { count, total, results } = data;
      const allRecords = await service.fetchAllCharacters(total, results);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(allRecords));
    } else {
      // next time when API gets calls
      var hours = Math.abs(new Date(lastFetchedDate) - new Date()) / 36e5;

      // check lastfetched date and if hour difference is more then 24hr
      if (hours > 24) {
        const resp = await service.fetchFirstHundrdCharacters();
        const { data, code, status } = resp;
        const { count, total, results } = data;

        // check status code from marvel if it's not 304 that means records has some changes.
        if (code != 304) {
          // fetch all records again
          const allRecords = await service.fetchAllCharacters(total, results);
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(allRecords));
        } else {
          // send it from cache
          res.setHeader("Content-Type", "application/json");
          res.end(allCacheChar);
        }
      } else {
        // send it from cache
        res.setHeader("Content-Type", "application/json");
        res.end(allCacheChar);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).end("Something went wrong, please try again");
  }
};

const getCharacter = async (req, res) => {
  try {
    const id = req.params.id;
    let character = await redis.getAsync(id);

    if (character) {
      res.setHeader("Content-Type", "application/json");
      res.end(character);
    } else {
      axios
        .get(`/characters/${id}`)
        .then(result => {
          const char = result.data.data.results[0];

          let cObj = {
            id: char.id,
            name: char.name,
            description: char.description
          };

          redis.setAsync(char.id, JSON.stringify(cObj));
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(cObj));
        })
        .catch(err => {
          res.status(404).send("Character not found");
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).end("Something went wrong, please try again");
  }
};

module.exports = {
  getAllCharactersIds,
  getCharacter
};
