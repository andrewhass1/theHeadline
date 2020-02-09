const functions = require('firebase-functions');


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.createPost = functions.firestore
    .document('posts/{wildcard}')
    .onCreate((snap, context) => {
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const newValue = snap.data();

      // access a particular field as you would any JS property
      const title = newValue.title;

      // perform desired operations ...
      console.log(title);
    });

const admin = require("firebase-admin");
admin.initializeApp();
    
exports.hitCounter = functions.https.onRequest((req, res) => {
    var counterRef = admin.database().ref("hit_counter");
    return counterRef
        .transaction(current => {
        return (current || 0) + 1;
        })
  });
