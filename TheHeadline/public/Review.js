var db = firebase.firestore();
var postRef = db.collection("posts");
var yourTime = 0;

postRef.where("status", "==", "NOTPOSTED").get().then(snap => {
   size = snap.size // will return the collection size
   yourTime = size * 5;
   console.log(yourTime);
   document.getElementById('body').innerText = "It will be on the front page in about " + yourTime + " mins";
});
