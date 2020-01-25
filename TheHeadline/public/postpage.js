const firebaseConfig = {
    apiKey: "AIzaSyBYcEOx9UUkmT_Xb6oDZ68y2C8W7_Y7hos",
    authDomain: "theheadline-e09dc.firebaseapp.com",
    databaseURL: "https://theheadline-e09dc.firebaseio.com",
    projectId: "theheadline-e09dc",
    storageBucket: "theheadline-e09dc.appspot.com",
    messagingSenderId: "776776851089",
    appId: "1:776776851089:web:5b8f7d3b54e9e44ce92930",
    measurementId: "G-ZH74YM431H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function publish() {
    var db = firebase.firestore();
    var theTitle = document.getElementById('title').value;
    var theContent = document.getElementById('content').value;
    db.collection("posts").add({
        title: theTitle,
        content: theContent,
        user: "PUT USER ID HERE",
        time: firebase.firestore.FieldValue.serverTimestamp(),
        status: "NOTPOSTED"
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

}
