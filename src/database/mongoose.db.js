"use strict";
const mongoose = require("mongoose");

const { countConnectMongoDB } = require("../utils");
const {
  db: { host, port, name },
} = require("../configs/mongoose.config");

const url_connect = `mongodb://${host}:${port}/${name}`;

class DataBase {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(url_connect, { maxPoolSize: 10 })
      .then(() => {
        countConnectMongoDB();
        console.log("Connect Mongoose Successfully");
      })
      .catch(() => {
        console.log("Connect Mongoose Failed!!!!");
      });
  }

  static getInstance() {
    if (!DataBase.instanse) {
      DataBase.instanse = new DataBase();
    }

    return DataBase.instanse;
  }
}

const db = DataBase.getInstance;
module.exports = { db };
