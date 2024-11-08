const express = require("express");
const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");
const compression = require("compression");

const { db } = require("./database/mongoose.db");
const router = require("./routers");

const app = express();
dotenv.config();

//Middleware
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connect DB
db();

//Router
router(app);

//Start Server
app.listen(process.env.DEV_APP_PORT, () => {
  console.log(`Sever is running with PORT: ${process.env.DEV_APP_PORT}`);
});
