require("dotenv").config();
const { env } = process;

module.exports = {
  baseUrl: env.APP_BASE_URL,
  port: env.PORT,
  publicKey: env.PUBLIC_KEY,
  privateKey: env.PRIVATE_KEY
};
