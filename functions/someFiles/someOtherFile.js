const functions = require("firebase-functions");
const cors = require("cors");
const aiplatform = require("@google-cloud/aiplatform");
const allowedOrigins = require("../cors/allowedOrigins");

const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");

const extractInformation = functions.https.onCall(async (req, res) => {
  cors(allowedOrigins)(req, res, async () => {
    const data = req.body.data;
    // Access Secret Manager using your project ID and environment variable
    const projectId = "anue-8e4c9";
    const secretName = "aiPlatForm";
    const client = new SecretManagerServiceClient({ projectId });

    try {
      const [version] = await client.accessSecretVersion({
        name: client.secretVersionName(projectId, secretName, "latest"),
      });

      const key = JSON.parse(version.payload.data_as_string);

      // Initialize AI Platform client with retrieved key
      const client = new aiplatform.aiplatform({
        projectId,
        credentials: {
          private_key: key.private_key,
          client_email: key.client_email,
        },
      });

      // Use the AI Platform client with proper authentication
      // ... your AI Platform API calls here ...

      return { success: true };
    } catch (error) {
      console.error("Error accessing secret or using AI Platform API:", error);
      return { success: false, error: error.message };
    }
  });
});

const sayHelloAgainFromSomeFolder = functions
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
const extractInformationFallBack = functions
  .region("europe-west1")
  .runWith({
    // memory: "128MB",
    timeoutSeconds: 3,
  })
  .https.onRequest(async (req, res) => {
    cors(allowedOrigins)(req, res, async () => {
      const data = req.body.data;
      const { PredictionServiceClient } = aiplatform.v1;

      // Import the helper module for converting arbitrary protobuf.Value objects.
      const { helpers } = aiplatform;

      // Specifies the location of the api endpoint
      const clientOptions = {
        apiEndpoint: "us-central1-aiplatform.googleapis.com",
      };

      const publisher = "google";
      const model = "text-bison@001";

      // Instantiates a client
      const predictionServiceClient = new PredictionServiceClient(
        clientOptions,
      );

      async function callPredict() {
        // Configure the parent resource
        const endpoint = `projects/${data?.project}/locations/${data?.location}/publishers/${publisher}/models/${model}`;

        const instance = {
          content: `Background: There is evidence that there have been significant changes \
      in Amazon rainforest vegetation over the last 21,000 years through the Last \
      Glacial Maximum (LGM) and subsequent deglaciation. Analyses of sediment \
      deposits from Amazon basin paleo lakes and from the Amazon Fan indicate that \
      rainfall in the basin during the LGM was lower than for the present, and this \
      was almost certainly associated with reduced moist tropical vegetation cover \
      in the basin. There is debate, however, over how extensive this reduction \
      was. Some scientists argue that the rainforest was reduced to small, isolated \
      refugia separated by open forest and grassland; other scientists argue that \
      the rainforest remained largely intact but extended less far to the north, \
      south, and east than is seen today. This debate has proved difficult to \
      resolve because the practical limitations of working in the rainforest mean \
      that data sampling is biased away from the center of the Amazon basin, and \
      both explanations are reasonably well supported by the available data.

      Q: What does LGM stands for?
      A: Last Glacial Maximum.

      Q: What did the analysis from the sediment deposits indicate?
      A: Rainfall in the basin during the LGM was lower than for the present.

      Q: What are some of scientists arguments?
      A: The rainforest was reduced to small, isolated refugia separated by open forest and grassland.

      Q: There have been major changes in Amazon rainforest vegetation over the last how many years?
      A: 21,000.

      Q: What caused changes in the Amazon rainforest vegetation?
      A: The Last Glacial Maximum (LGM) and subsequent deglaciation

      Q: What has been analyzed to compare Amazon rainfall in the past and present?
      A: Sediment deposits.

      Q: What has the lower rainfall in the Amazon during the LGM been attributed to?
      A:
      `,
        };
        const instanceValue = helpers.toValue(instance);
        const instances = [instanceValue];

        const parameter = {
          temperature: 0.2,
          maxPromptTokens: 256,
          topP: 0,
          topK: 1,
        };
        const parameters = helpers.toValue(parameter);

        const request = {
          endpoint,
          instances,
          parameters,
        };

        // Predict request
        const [response] = await predictionServiceClient.predict(request);
        // console.log("Get text extraction response");
        const predictions = response.predictions;
        // console.log("\tPredictions :");
        for (const prediction of predictions) {
          // console.log(`\t\tPrediction : ${JSON.stringify(prediction)}`);
        }
        res.status(201).send({
          data: {
            message: `hey ${data.name}, thanks for saying "${data.message}", sayHello says hello too!`,
            data: data,
            predictions: predictions,
          },
        });
      }

      callPredict();
    });
  });
module.exports = {
  sayHelloAgainFromSomeFolder,
  extractInformation,
};
