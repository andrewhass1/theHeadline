

function signout() {
    console.log('sign out')
    firebase.auth().signOut().then(function() {
        location.href = 'HomePage.html';
    }).catch(function(error) {
        // An error happened.
    });

}



var db = firebase.firestore();
var postRef = db.collection("users");

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      var loadingCover = document.getElementById("whiteout");
      loadingCover.style.display = "none";
      postRef.where("id", "==", user.email).limit(1)
          .get()
          .then(function(querySnapshot) {
              if (querySnapshot.empty) {
                  document.getElementById('bio').innerText = ""
                  document.getElementById('id').innerText = ""
                  document.getElementById('username').innerText = ""

              } else {
                  querySnapshot.forEach(function(doc) {
                      // doc.data() is never undefined for query doc snapshots
                      console.log(doc.id, " => ", doc.data());
                      document.getElementById('bio').innerText = doc.data().bio + "\n" + "*click to edit";
                      document.getElementById('username').innerText = doc.data().username;



                  });
              }

          })
          .catch(function(error) {
              console.log("Error getting documents: ", error);
          });
  } else {
    location.replace("singInPage.html")
  }
});

function create() {
    firebase.auth().onAuthStateChanged(function(user){
        if (user) {
            location.href = 'PostPage.html';
        } else {
            location.href = 'singInPage.html';

        }
      });

}

function editbio() {

    firebase.auth().onAuthStateChanged(function(user){
        if (user) {
      postRef.where("id", "==", user.email).limit(1)
          .get()
          .then(function(querySnapshot) {
              if (querySnapshot.empty) {
                  document.getElementById('bio').innerText = ""
                  document.getElementById('id').innerText = ""
                  document.getElementById('username').innerText = ""

              } else {
                  querySnapshot.forEach(function(doc) {
                      // doc.data() is never undefined for query doc snapshots
                      console.log(doc.id, " => ", doc.data());
                      localStorage.removeItem("bio");
                      localStorage.setItem("bio", doc.data().bio);
                      location.href="editBio.html"


                  });
              }

          })
          .catch(function(error) {
              console.log("Error getting documents: ", error);
          });
        } else {
            location.replace('singInPage.html');

        }
      });
}
