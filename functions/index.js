/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable comma-dangle */
/* eslint-disable indent */

//TODO: cloud fcs are in gen1 of firebase. Upgrde to gen2
const cors = require("cors");
const express = require("express");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const serviceAccount = require("./serviceAccountKey.json");
const allowedOrigins = require("./cors/allowedOrigins");
const app = require("./app");

const {
  // getAllDocs,
  // getAllStories,
  // sayHello,
  // getDocIdSByValueSearch,
} = require("./firestore/firestore.js");
// exports.getDocIdSByValueSearch = getDocIdSByValueSearch;
const {
  analyzeSentiment,
  analyzingSyntax,
  extractEntities,
} = require("./llm/analyzingText.js");

const {
  sayHelloAgainFromSomeFolder,
  extractInformation,
} = require("./someFiles/someOtherFile.js");
const { helloAuth } = require("./users/onCreate.js");
const { fetchPage } = require("./webpage-fetcher/fetchUrl.js");
const { standIn3 } = require("./llm/chatbot.js");
const { submitText } = require("./llm/palm2.js");
const { fetchContent } = require("./scraper/scraper.js");

module.exports = {
  analyzingSyntax,
  extractEntities,
  standIn3,
  app,
  submitText,
  fetchContent,
};
