"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = exports.collections = void 0;
const mongodb_1 = require("mongodb");
const connectToDB = (cb) => {
    mongodb_1.MongoClient.connect("mongodb://localhost:27017")
        .then(client => {
        let db = client.db("myFirstDB");
        exports.collections = db.collection("newCollection");
        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${exports.collections.collectionName}`);
        return cb(null);
    })
        .catch((err) => {
        console.log(err);
        cb(err);
    });
};
exports.connectToDB = connectToDB;
