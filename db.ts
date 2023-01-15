
import { MongoClient } from "mongodb";
import * as mongoDB from "mongodb";
import Book from "./models/book";


export let collections: mongoDB.Collection<Book>;

export type CallbackFunc = (err: Error | null) => void;

export const connectToDB = (cb: CallbackFunc) => {
    MongoClient.connect("mongodb://localhost:27017")
        .then(client => {
            let db: mongoDB.Db = client.db("myFirstDB");
            collections = db.collection<Book>("newCollection");

            console.log(`Successfully connected to database: ${db.databaseName} and collection: ${collections.collectionName}`);

            return cb(null);
        })
        .catch((err: Error) => {
            console.log(err);
            cb(err);
        })
}