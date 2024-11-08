require("dotenv").config();

const development = {
  app: {
    port: process.env.DEV_APP_PORT || 8000,
  },
  db: {
    host: process.env.DEV_DB_HOST || "localhost",
    port: process.env.DEV_DB_PORT || "27017",
    name: process.env.DEV_DB_NAME || "ercommers",
  },
};

const production = {
  app: {
    port: process.env.PRODUCTION_APP_PORT,
  },
  db: {
    host: process.env.PRODUCTION_DB_HOST,
    port: process.env.PRODUCTION_DB_PORT,
    name: process.env.PRODUCTION_DB_NAME,
  },
};

const configs = { development, production };
module.exports = configs[process.env.NODE_ENV || "development"];
