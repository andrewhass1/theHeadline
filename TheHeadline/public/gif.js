var db = firebase.firestore();
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  } else {
    location.replace('singInPage.html')
  }
});
var db = firebase.firestore();
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      db.collection("posts").add({
          title: localStorage.getItem('title'),
          content: localStorage.getItem('content'),
          user: user.uid,
          time: firebase.firestore.FieldValue.serverTimestamp(),
          status: "NOTPOSTED"
      })
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          location.href = 'Gif.html';
          localStorage.setItem("control", '1null123');
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
  } else {
    location.replace('singInPage.html');
  }
});