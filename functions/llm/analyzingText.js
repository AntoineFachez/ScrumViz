const functions = require("firebase-functions");
// Imports the Google Cloud client library
const language = require("@google-cloud/language");
const cors = require("cors");
const allowedOrigins = require("../cors/allowedOrigins");
// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json");

const client = new language.LanguageServiceClient();
const encodingType = "UTF8"; // UTF16 UTF32
const analyzeSentiment = functions
  .region("europe-west1")
  .runWith({
    // memory: "128MB",
    timeoutSeconds: 3,
  })
  .https.onRequest(async (req, res) => {
    cors(allowedOrigins)(req, res, async () => {
      const data = req.body.data;
      //   // Instantiates a client
      const message = data.message;

      functions.logger.log(`ANALYZING MESSAGE: "${message}"`);

      try {
        const results = await client.analyzeSentiment({
          document: { content: message, type: "PLAIN_TEXT" },
          encodingType,
        });

        const category = categorizeScore(results[0].documentSentiment.score);
        // const data = {
        //   message: message,
        //   sentiment: results[0],
        //   category: category,
        // };

        // @ts-ignore
        // const uid = req.user.uid;
        // await admin.database().ref(`/users/${uid}/messages`).push(data);
        res
          .status(201)
          .header("Access-Control-Allow-Origin", "*")
          .send({ data: { message, category } });
      } catch (error) {
        functions.logger.log(
          "Error detecting sentiment or saving message",
          // @ts-ignore
          error.message,
        );
        res.sendStatus(500);
      }
    });
  });
const analyzingSyntax = functions
  .region("europe-west1")
  .runWith({
    // memory: "128MB",
    timeoutSeconds: 3,
  })
  .https.onRequest(async (req, res) => {
    cors(allowedOrigins)(req, res, async () => {
      const data = req.body.data;
      //   // Instantiates a client
      const message = data.message;
      try {
        // const [response] = await client.analyzeEntities({
        //   document: { content: message, type: "PLAIN_TEXT" },
        // });
        // Need to specify an encodingType to receive word offsets

        // Detects the sentiment of the document
        const [response] = await client.analyzeSyntax({
          document: { content: message, type: "PLAIN_TEXT" },
          encodingType,
        });

        // console.log("Tokens:");
        response.tokens.forEach((part) => {
          // console.log(`${part.partOfSpeech.tag}: ${part.text.content}`);
          // console.log("Morphology:", part.partOfSpeech);
        });
        res.status(201).send({ data: { message, response } });
      } catch (error) {
        console.error(error);
        throw new functions.https.HttpsError(
          "internal",
          "Error analyzing text",
          error,
        );
      }
    });
  });
const extractEntities = functions
  .region("europe-west1")
  .runWith({
    // memory: "128MB",
    timeoutSeconds: 3,
  })
  .https.onRequest(async (req, res) => {
    cors(allowedOrigins)(req, res, async () => {
      const data = req.body.data;
      //   // Instantiates a client
      const message = data.message;
      try {
        const [response] = await client.analyzeEntities({
          document: { content: message, type: "PLAIN_TEXT" },
          encodingType,
        });
        res.status(201).send({ data: { message, response } });
      } catch (error) {
        console.error(error);
        throw new functions.https.HttpsError(
          "internal",
          "Error analyzing text",
          error,
        );
      }
    });
  });

//TODO returns status 500
const standIn1 = functions
  .region("europe-west1")
  .runWith({
    // memory: "128MB",
    timeoutSeconds: 3,
  })
  .https.onRequest(async (req, res) => {
    cors("*")(req, res, async () => {
      const data = req.body.data;
      functions.logger.log(`DATA: "${data}"`);

      res
        .status(201)
        .header("Access-Control-Allow-Origin", "*")
        .send({
          data: {
            message: `hey ${data.name}, thanks for saying "${data.message}", sayHello says hello too!`,
            data: data,
          },
        });
    });
  });
const categorizeScore = (score) => {
  if (score > 0.25) {
    return "positive";
  } else if (score < -0.25) {
    return "negative";
  }
  return "neutral";
};
module.exports = {
  analyzeSentiment,
  analyzingSyntax,
  extractEntities,
  standIn1,
};
