const { firestore } = require("firebase-admin");
const functions = require("firebase-functions");

db = new firestore.Firestore();

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.analytics = functions.https.onRequest((request, response) => {
    const time = new Date().toLocaleString();

    db.collection("analytics").add({
        "hello": "world1"
    })

    response.send("Thanks for taking a look ;)");
});


