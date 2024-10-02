const functions = require("firebase-functions");
// Imports the Google Cloud client library
const language = require("@google-cloud/language");
const cors = require("cors");
const allowedOrigins = require("../cors/allowedOrigins");
// const fetchContent = functions
//   .region("europe-west1")
//   .runWith({
//     // memory: "128MB",
//     timeoutSeconds: 3,
//   })
//   .https.onRequest(async (req, res) => {
//     cors("*")(req, res, async () => {
//       const data = req.body.data;

//       res
//         .status(201)
//         .header("Access-Control-Allow-Origin", "*")
//         .send({
//           data: {
//             message: `hey ${data.name}, thanks for saying "${data.message}", sayHello says hello too!`,
//             data: data,
//           },
//         });
//     });
//   });
const fetchContent = functions.https
  //   .region("europe-west1")
  //   .runWith({
  //     // memory: "128MB",
  //     timeoutSeconds: 3,
  //   })
  .onCall(async (data, context) => {
    // cors("*")(data, context, async () => {
    functions.logger.log(`DATA: "${data}"`);
    const url = data.url;

    try {
      const response = await fetch(url);

      // Check for successful response
      if (!response.ok) {
        throw new Error(`Error fetching content: ${response.statusText}`);
      }

      const content = await response.text(); // Get the content as text

      return content;
    } catch (err) {
      functions.logger.error("Error fetching content:", err.message);
      return err;
    }
    // });
  });
module.exports = {
  fetchContent,
};
