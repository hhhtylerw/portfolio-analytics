const { firestore } = require("firebase-admin");
const functions = require("firebase-functions");
const cors = require('cors')({origin: true});

db = new firestore.Firestore();

exports.helloWorld = functions.https.onRequest((request, response) => {
  // functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.analytics = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const unixtime = new Date().getTime().toString();
        const stringtime = new Date().toLocaleString();
    
        db.collection("visits").doc(unixtime).set({
          "time": stringtime,
            "ip": request.ip,
            "user-agent": request.headers["user-agent"],
        })
    
        response.send("Thanks for taking a look ;)");
    });
});

exports.totalVisits = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        db.collection("visits").get().then((querySnapshot) => {
            response.send(querySnapshot.size.toString());
        });
    });    
});

exports.uniqueVisits = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        db.collection("visits").get().then((querySnapshot) => {
            var count = 0;
            const used = new Set();
    
            querySnapshot.forEach((doc) => {
                if (!used.has(doc.data().ip)) {
                    used.add(doc.data().ip);
                    count++;
                }
            });
    
            response.send(count.toString());
        });
    });
});