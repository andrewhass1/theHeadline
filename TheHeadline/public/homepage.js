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

var db = firebase.firestore();
var postRef = db.collection("posts");

var stDocRef = postRef.where("status", "==", "NOTPOSTED").orderBy("time", "asc").limit(1);

postRef.where("status", "==", "NOTPOSTED").orderBy("time", "asc").limit(1)
    .get()
    .then(function(querySnapshot) {
        if (querySnapshot.empty) {
            document.getElementById('aTitle').innerText = "Post something, it will appear right here. Its time for people to hear your voice."
            document.getElementById('aText').innerText = "If you have something to share post it and it will appear right here immidetly for the world to see! Right now all the post have been shown. If you would like to see more content, tell your friends or write your own. Write something that matters to you. Share your thoughts, your beliefs, or your ideas. Share some news, tell a short story, or write about yourself. \n \n Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat Read Enjoy Learn Create Repeat"
            document.getElementById('postDetailText').innerText = "Team Headline " + "· 10,242 views"
            document.getElementById('author').innerText = "Written By: " + "Team Headline"
            document.getElementById('bio').innerText = "Bio: " + "Small team based in Boston trying to help people share their stories, beleifs and ideas. Welcome to a place on the internet where your voice is heard."

        } else {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                document.getElementById('aText').innerText = doc.data().content;
                document.getElementById('aTitle').innerText = doc.data().title;

                postRef.doc(doc.id).update({
                    status: "POSTED"
                });



            });
        }

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
