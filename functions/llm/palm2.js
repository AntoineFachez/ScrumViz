const { JWT } = require("google-auth-library");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ override: true });

const allowedOrigins = require("../cors/allowedOrigins");
const functions = require("firebase-functions");
const API_ENDPOINT = "us-central1-aiplatform.googleapis.com";
const URL = `https://${API_ENDPOINT}/v1beta1/projects/${process.env.GOOGLE_GEN_AI_KEY}/locations/us-central1/publishers/google/models/gemini-pro:streamGenerateContent`;
const keys = require("../serviceAccountKey.json");
const getIdToken = async () => {
  const client = new JWT({
    keyFile: keys,
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });
  const idToken = await client.authorize();
  functions.logger.log("ID_TOKEN", idToken);
  return idToken.access_token;
};
const submitText = functions
  .region("europe-west1")
  .runWith({
    // memory: "128MB",
    timeoutSeconds: 180,
  })
  .https.onRequest(async (req, res) => {
    cors(allowedOrigins)(req, res, async () => {
      try {
        const getTextGemini = async () => {
          const headers = {
            Authorization: `Bearer ` + (await getIdToken()),
            "Content-Type": "application/json",
          };

          const data = {
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: req.body.data.prompt,
                  },
                ],
              },
            ],
            generation_config: {
              maxOutputTokens: 2048,
              temperature: req.body.data.temperature || 0.5,
              topP: 0.8,
            },
          };

          const response = await fetch(URL, {
            method: "POST",
            headers,
            body: JSON.stringify(data),
          });

          if (!response.ok) {
            functions.logger.error(response.statusText);
            throw new Error("Request failed " + response.statusText);
          }

          const result = await response.json();
          functions.logger.log(result);
          return result
            .map((r) => r?.candidates?.[0]?.content?.parts?.[0]?.text)
            .join("");
        };
        getTextGemini(req.body.prompt, req.body.temperatur);
      } catch (error) {
        functions.logger.error(error);
      }
    });
  });

module.exports = {
  submitText,
};
