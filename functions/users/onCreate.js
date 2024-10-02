/**
 * Background Function triggered by a change to a Firebase Auth user object.
 *
 * @param {!Object} event The Cloud Functions event.
 */

const admin = require("../node_modules/firebase-admin/lib");

// const emailSender = require("email-sender");
// ... your trigger code

const helloAuth = async (event) => {
  const user = {
    email: "anthony.zornig@gmx.de",
    metadata: {
      createdAt: "2023-09-11T19:29:16Z",
    },
    userId: "B7w2jhuF61WHj4KFAhif",
  };
  const emailContent = {
    to: user.email,
    from: user.email,
    subject: "Welcome to our app!",
    template: "welcome_email", // Use your template name
    data: {
      name: user.name,
    },
  };
  const userId = user.userId; // Assuming your document ID represents the user ID

  const userRef = admin.firestore().doc(`users/${userId}`);

  try {
    // console.log(`Function triggered by change to user: ${user.uid}`);
    // console.log(`Created at: ${user.metadata.createdAt}`);

    if (user.email) {
      // console.log(`Email: ${user.email}`);
      userRef.get().then(async (doc) => {
        const userEmail = doc.data().userMail;
        // await emailSender.send(emailContent);
      });
    }
  } catch (err) {
    console.error(err);
  }
};
module.exports = { helloAuth };
