const functions = require("firebase-functions");
const cors = require("cors");
const allowedOrigins = require("../cors/allowedOrigins");

const fetchPage = functions
  .region("europe-west1")
  .runWith({
    // memory: "128MB",
    // timeoutSeconds: 3,
  })
  .https.onRequest((req, res) => {
    cors(allowedOrigins)(req, res, async () => {
      // Extract callback function name from query parameter
      const callbackName = req.query.callback;

      // Validate callback name (optional)
      if (!callbackName || !/^[a-zA-Z0-9_.]+$/.test(callbackName)) {
        return res.status(400).send("Invalid callback name");
      }

      // URL to fetch
      const targetUrl = req.query.url;

      // Ensure URL is provided
      if (!targetUrl) {
        return res.status(400).send("Missing URL parameter");
      }

      // Generate a unique key for caching
      const key = `${targetUrl}-${callbackName}`;

      // Check cache for response (optional)
      // Implement your caching logic here (e.g., using Redis)

      // Fetch webpage content
      fetch(targetUrl)
        .then((response) => response.text())
        .then((content) => {
          // Wrap content in callback function call
          const responseBody = `${callbackName}(${JSON.stringify(content)})`;
          // const responseBody = JSON.stringify(content);

          // Set CORS headers
          res.set({
            "Access-Control-Allow-Origin": "*", // Adjust origin if needed
            "Content-Type": "application/javascript",
          });

          // Send JSONP response
          res.send(responseBody);
        })
        .catch((error) => {
          res.status(500).send("Error fetching content");
        });
    });
  });
module.exports = {
  fetchPage,
};
