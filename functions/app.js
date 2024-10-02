// app.js
const express = require("express");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const serviceAccount = require("./serviceAccountKey.json");

const cors = require("cors");
const allowedOrigins = require("./cors/allowedOrigins");
const app = express();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    preflightContinue: true,
  }),
);
app.use(express.json());

module.exports = app;
