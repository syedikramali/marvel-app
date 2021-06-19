const axios = require("../modules/axios");
const redis = require("../modules/redisManager");
const {
  MAX_RECORDS,
  ALL_CHARACTERS_KEY,
  LAST_FETCHED_DATE_ALL
} = require("./constants");

const fetchFirstHundrdCharacters = async () => {
  const response = await axios.get(`/characters?offset=0&limit=${MAX_RECORDS}`);
  return { ...response.data };
};

const fetchAllCharacters = (total, results) => {
  return new Promise((resolve, reject) => {
    let i = 100;
    const offSetList = [];
    while (i < total) {
      offSetList.push(i);
      i += 100;
    }

    const allRequest = [];
    offSetList.forEach(offset => {
      allRequest.push(
        axios.get(`/characters?offset=${offset}&limit=${MAX_RECORDS}`)
      );
    });
    const firstCallIds = results.map(c => c.id);

    Promise.all(allRequest).then(
      res => {
        let allIDs = [...firstCallIds];
        res.forEach(item => {
          const records = item.data.data.results;
          const ids = records.map(char => {
            let cObj = {
              id: char.id,
              name: char.name,
              description: char.description
            };
            redis.setAsync(char.id, JSON.stringify(cObj));
            return char.id;
          });
          allIDs = [...allIDs, ...ids];
        });

        redis.setAsync(ALL_CHARACTERS_KEY, JSON.stringify(allIDs));
        redis.setAsync(LAST_FETCHED_DATE_ALL, new Date());
        resolve(allIDs);
        return;
      },
      error => {
        console.log(error);
        reject(error);
      }
    );
  });
};

module.exports = {
  fetchFirstHundrdCharacters,
  fetchAllCharacters
};
