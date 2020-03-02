var db = firebase.firestore();

var userRef = db.collection("users");

firebase.auth().onAuthStateChanged(function(user){
  if(user) { //After successful login, user will be redirected to home.html
      userRef.where("id", "==", user.uid)
          .get()
          .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                  document.getElementById("inlineFormInputGroupUsername").value = doc.data().twitterUN;
              });

          })

          .catch(function(error) {
              console.log("Error getting documents: ", error);
          });


  } else {
    location.replace("HomePage.html");
  }

});



function update(){
  firebase.auth().onAuthStateChanged(function(user){
    if(user) { //After successful login, user will be redirected to home.html

        userRef.where("id", "==", user.uid)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    console.log(doc.data().username);

                    userRef.doc(doc.id).update({
                        twitterUN: document.getElementById("inlineFormInputGroupUsername").value
                    });

                    userRef.where("twitterUN", "==", document.getElementById("inlineFormInputGroupUsername").value)
                    .get()
                    .then(function(querySnapshot) {

                        location.replace("ReviewPage.html");


                    })
                    .catch(function(error) {
                        console.log("Error getting documents: ", error);
                    })

                });

            })

            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });



    } else {
      location.replace("HomePage.html");
    }

  });
}
