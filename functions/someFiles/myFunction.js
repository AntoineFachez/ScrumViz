/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
const functions = require("firebase-functions");
const cors = require("cors");
const allowedOrigins = require("../cors/allowedOrigins");

const wizardFuncRequest = functions
  .region("europe-west1")
  .runWith({
    // memory: "128MB",
    timeoutSeconds: 3,
  })
  .https.onRequest(async (req, res) => {
    cors(allowedOrigins)(req, res, async () => {
      const data = req.body.data;
      res.status(200).json({
        result: `hey ${data.name}, thanks for saying "${data.message}", wizardFuncRequest says hello too!`,
      });
    });
  });
const sayHelloAgain = functions
  .region("europe-west1")
  .runWith({
    // memory: "128MB",
    timeoutSeconds: 3,
  })
  .https.onRequest(async (req, res) => {
    cors(allowedOrigins)(req, res, async () => {
      const data = req.body.data;
      // onDocumentCreated;
      res.status(201).send({
        data: {
          message: `hey ${data.name}, thanks for saying "${data.message}", sayHello says hello too!`,
          data: data,
        },
      });
    });
  });
module.exports = { wizardFuncRequest, sayHelloAgain };
