function publish() {
    var db = firebase.firestore();
    var theTitle = document.getElementById('title').value;
    var theContent = document.getElementById('content').value;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          db.collection("posts").add({
              title: theTitle,
              content: theContent,
              user: user.email,
              time: firebase.firestore.FieldValue.serverTimestamp(),
              status: "NOTPOSTED"
          })
          .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
              console.error("Error adding document: ", error);
          });
      } else {
        // No user is signed in.
      }
    });


}
