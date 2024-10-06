const functions = require("firebase-functions");
const cors = require("cors");
require("dotenv").config();

const {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} = require("@google/generative-ai");
const app = require("../app");
const allowedOrigins = require("../cors/allowedOrigins");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY);

app.post("standIn3", async (req, res) => {});
//TODO returns status 500
const standIn3 = functions
  .region("europe-west1")
  .runWith({
    memory: "512MB",
    timeoutSeconds: 180,
  })
  .https.onRequest(async (req, res) => {
    cors("*")(req, res, async () => {
      const data = req.body.data;

      const generationConfig = {
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
          },
        ],
        temperature: 0.9,
        top_p: 1,
        top_k: 32,
        maxPromptTokens: 100, // limit output
      };
      const model = genAI.getGenerativeModel({
        model: "gemini-pro", // or 'gemini-pro-vision'
        ...generationConfig,
      });

      try {
        const prompt = "What is the largest number with a name?";
        const result = await model.generateContent(prompt);
        functions.logger.log(result);
        res
          .status(201)
          .header("Access-Control-Allow-Origin", "*")
          .send({
            data: {
              message: `hey ${data.name}, thanks for saying "${data.message}", sayHello says hello too!`,
              data: data,
            },
          });
        // const response = await result.response;
        // const text = response.text();
        // res.status(201).header("Access-Control-Allow-Origin", "*").send({
        //   data: text,
        // });
      } catch (error) {
        functions.logger.log(error);
      }
    });
  });
module.exports = {
  standIn3,
};
