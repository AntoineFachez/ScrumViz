/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
const cors = require("cors");
const allowedOrigins = require("../cors/allowedOrigins");

const functions = require("firebase-functions");
const admin = require("../node_modules/firebase-admin/lib");

const getAllDocs = functions
  .region("europe-west1")
  .runWith({
    // memory: "128MB",
    timeoutSeconds: 3,
  })
  .https.onRequest(async (req, res) => {
    cors(allowedOrigins)(req, res, async () => {
      const data = req.body.data;
      // onDocumentCreated;
      res.status(200).json({
        result: `hey ${data.name}, thanks for saying "${data.message}", getAllDocs says hello too!`,
      });
    });
  });

const sayHello = functions
  .region("europe-west1")
  .runWith({
    // memory: "128MB",
    timeoutSeconds: 3,
  })
  .https.onRequest(async (req, res) => {
    cors(allowedOrigins)(req, res, async () => {
      const data = req.body.data;
      // onDocumentCreated;
      res.status(200).json({
        result: `hey ${data.name}, thanks for saying "${data.message}", sayHello says hello too!`,
      });
    });
  });
//TODO "Error: 16 UNAUTHENTICATED: Request had invalid authentication credentials. Expected OAuth 2 access token,
//todo login cookie or other valid authentication credential. See https://developers.google.com/identity/sign-in/web/devconsole-project.
const getAllStories = functions
  .region("europe-west1")
  .runWith({
    // memory: "128MB",
    timeoutSeconds: 3,
  })
  .https.onRequest(async (request, response) => {
    cors(allowedOrigins)(request, response, async () => {
      const snapshot = await admin.firestore().collection("universities").get();
      const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      response.json({ posts });
    });
  });
module.exports = { getAllDocs, sayHello, getAllStories };
