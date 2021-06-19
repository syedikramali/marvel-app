const axs = require("axios");
const md5 = require("md5");
const config = require("../config");
const axios = axs.create({
  baseURL: config.baseUrl,
  params: {
    apikey: config.publicKey,
    hash: md5(`1624031266${config.privateKey}${config.publicKey}`),
    ts: 1624031266
  }
});

module.exports = axios;
