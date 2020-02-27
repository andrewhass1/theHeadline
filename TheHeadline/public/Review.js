var db = firebase.firestore();
var postRef = db.collection("posts");
var yourTime = 0;

firebase.auth().onAuthStateChanged(function(user) {
   if (user) {
      postRef.where("status", "==", "NOTPOSTED").get().then(snap => {
         size = snap.size // will return the collection size
         yourTime = size * 5;
         console.log(yourTime);
         document.getElementById('body').innerText = "It will be on the front page in about " + yourTime + " mins";
      });
   } else {
     location.replace('HomePage.html');
   }
 });
 firebase.auth().onAuthStateChanged(function(user) {
   if (user) {
     // User is signed in.
   } else {
     location.replace('singInPage.html')
   }
 });