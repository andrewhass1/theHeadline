function publish() {
    if(document.getElementById("title").value == '' || document.getElementById("content").value == '')
    {
        var alert = document.getElementById("theAlert");
        alert.style.display = "block";
    }
    else
    {
          var db = firebase.firestore();
          firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                db.collection("posts").add({
                    title: document.getElementById('title').value,
                    content: document.getElementById('content').value,
                    user: user.uid,
                    time: firebase.firestore.FieldValue.serverTimestamp(),
                    status: "NOTPOSTED",
                    id: "blank"
                })
                .then(function(docRef) {
                  db.collection("posts").doc(docRef.id).update({
                      id: docRef.id
                  })
                  var postRef = db.collection("posts");
                  postRef.where("id", "==", docRef.id).where("status", "==", "NOTPOSTED").limit(1)
                  .get()
                  .then(function(querySnapshot) {
                      querySnapshot.forEach(function(doc) {

                          if (querySnapshot.empty) {
                            db.collection("posts").doc(docRef.id).update({
                          id: docRef.id
                      })
                          } else {
                            localStorage.setItem("control", '1null123');
                        location.href = 'TwitterPage.html';
                          }

                      });

                  })

                        localStorage.setItem("control", '1null123');
                        location.href = 'TwitterPage.html';
                  })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
                    });
        } else {
          location.replace('singInPage.html');
        }
      });
    }

}
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
    } else {
      location.replace('singInPage.html')
    }
  });
