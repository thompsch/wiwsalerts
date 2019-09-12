import { RemoteMongoClient } from "mongodb-stitch-browser-sdk";
import { app } from "./app";

const mongoClient = app.getServiceClient(
  RemoteMongoClient.factory,
  "atlas"
);

const userCollection = mongoClient.db("alerts").collection("users");
const appSettingsCollection = mongoClient.db("alerts").collection("appSettings");

export { userCollection, appSettingsCollection };

